import { ethers } from "hardhat";
import { expect } from "chai";
import bn from "bignumber.js";
import { BigNumberish, BigNumber, constants, utils, ContractTransaction } from "ethers";
import { DexAdapter, ERC20 } from "../../typechain";
import { time } from "@nomicfoundation/hardhat-network-helpers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

const POSITION_MANAGER = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";
const SWAP_ROUTER = "0xE592427A0AEce92De3Edee1F18E0157C05861564";

bn.config({ EXPONENTIAL_AT: 999999, DECIMAL_PLACES: 40 });

// returns the sqrt price as a 64x96
export function encodePriceSqrt(reserve1: BigNumberish, reserve0: BigNumberish): BigNumber {
    return BigNumber.from(
        new bn(reserve1.toString())
            .div(reserve0.toString())
            .sqrt()
            .multipliedBy(new bn(2).pow(96))
            .integerValue(3)
            .toString()
    );
}

async function createPoolAndMintPosition(
    dexAdapter: DexAdapter,
    user: SignerWithAddress,
    brlToken: ERC20,
    tuzToken: ERC20
) {
    const tokenA = brlToken.address;
    const tokenB = tuzToken.address;
    const fee = 500;
    const amount0ToMint = ethers.utils.parseEther("1000");
    const amount1ToMint = ethers.utils.parseEther("1000");
    const minTick = -885000;
    const maxTick = -minTick;
    const sqrtPriceX96 = encodePriceSqrt(1, 1);

    const newPool = await dexAdapter.connect(user).createPool(tokenA, tokenB, fee, sqrtPriceX96);
    const poolResult = await newPool.wait();
    const poolCreatedEvent = poolResult.events?.find((event: any) => event.event === "PoolCreated");

    const pairAddress = poolCreatedEvent?.args?.pair;

    await brlToken.approve(dexAdapter.address, ethers.utils.parseEther("2000"));
    await tuzToken.approve(dexAdapter.address, ethers.utils.parseEther("2000"));

    const newMint = await dexAdapter
        .connect(user)
        .mintNewPosition(tokenA, tokenB, fee, amount0ToMint, amount1ToMint, minTick, maxTick);

    const mintResult = await newMint.wait();
    const poolMintedEvent = mintResult.events?.find(
        (event: any) => event.event === "PositionMinted"
    );
    const tokenId = poolMintedEvent?.args?.tokenId;

    return { tokenId, pairAddress };
}

async function performSwaps(
    dexAdapter: DexAdapter,
    user: SignerWithAddress,
    brlToken: ERC20,
    tuzToken: ERC20
) {
    const swaps = [
        {
            tokenIn: tuzToken.address,
            amountIn: ethers.utils.parseEther("500"),
            amountOutMinimum: 0,
            path: [tuzToken.address, 500, brlToken.address],
        },
    ];

    for (const swap of swaps) {
        const path = ethers.utils.solidityPack(["address", "uint24", "address"], [...swap.path]);

        const tx = await dexAdapter
            .connect(user)
            .swapExactInput(swap.tokenIn, swap.amountIn, swap.amountOutMinimum, path);

        await tx.wait();
    }
}

describe("DexAdapter unit tests", () => {
    const deployContractFixture = async () => {
        const signers = await ethers.getSigners();
        const deployer = signers[0];
        const user = signers[1];

        const DexAdapterFactory = await ethers.getContractFactory("DexAdapter");
        const ERC20ContractFactory = await ethers.getContractFactory("ERC20");

        const dexAdapter = await DexAdapterFactory.connect(deployer).deploy(
            POSITION_MANAGER,
            SWAP_ROUTER
        );

        const brlToken = await ERC20ContractFactory.connect(deployer).deploy(
            "Burlan",
            "BRL",
            18,
            ethers.utils.parseEther("10000"),
            deployer.address
        );

        const tuzToken = await ERC20ContractFactory.connect(deployer).deploy(
            "Tuzan",
            "TUZ",
            18,
            ethers.utils.parseEther("10000"),
            deployer.address
        );

        return { deployer, dexAdapter, brlToken, tuzToken, user };
    };

    describe("Contract initialization", () => {
        it("Should have correct addresses", async () => {
            const { dexAdapter } = await deployContractFixture();

            expect(await dexAdapter.positionManager()).to.equal(POSITION_MANAGER);
            expect(await dexAdapter.swapRouter()).to.equal(SWAP_ROUTER);
        });
    });

    describe("createPool", () => {
        it("Should revert if if non-owner tries to create pool", async () => {
            const { dexAdapter, user, brlToken } = await deployContractFixture();

            const tokenA = brlToken.address;
            const tokenB = brlToken.address;
            const fee = 500;
            const sqrtPriceX96 = encodePriceSqrt(1, 1);

            await expect(
                dexAdapter.connect(user).createPool(tokenA, tokenB, fee, sqrtPriceX96)
            ).to.be.revertedWithCustomError(dexAdapter, "OnlyOwnerError");
        });

        it("Should revert if tokens have identical address", async () => {
            const { dexAdapter, deployer, brlToken } = await deployContractFixture();

            const tokenA = brlToken.address;
            const tokenB = brlToken.address;
            const fee = 500;
            const sqrtPriceX96 = encodePriceSqrt(1, 1);

            await expect(
                dexAdapter.connect(deployer).createPool(tokenA, tokenB, fee, sqrtPriceX96)
            ).to.be.revertedWithCustomError(dexAdapter, "IdenticalAddressesError");
        });

        it("Should create pool successfully", async () => {
            const { dexAdapter, deployer, brlToken, tuzToken } = await deployContractFixture();

            const tokenA = brlToken.address;
            const tokenB = tuzToken.address;
            const fee = 500;
            const sqrtPriceX96 = encodePriceSqrt(1, 1);

            const [sortedTokenA, sortedTokenB] = await dexAdapter._sortTokens(tokenA, tokenB);

            const tx = await dexAdapter
                .connect(deployer)
                .createPool(sortedTokenA, sortedTokenB, fee, sqrtPriceX96);

            await expect(tx).to.emit(dexAdapter, "PoolCreated");

            const result = await tx.wait();
            expect(result.events?.length).to.be.greaterThan(0);

            const poolCreatedEvent = result.events?.find(
                (event: any) => event.event === "PoolCreated"
            );

            const eventTokenA = poolCreatedEvent?.args?.tokenA;
            const eventTokenB = poolCreatedEvent?.args?.tokenB;
            expect(eventTokenA).to.equal(sortedTokenA);
            expect(eventTokenB).to.equal(sortedTokenB);

            const pairAddress = poolCreatedEvent?.args?.pair;
            expect(pairAddress).to.not.equal(constants.AddressZero);

            console.log("Pair Address:", pairAddress);
        });
    });

    describe("mintNewPosition", () => {
        it("Should mint new position successfully", async () => {
            const { dexAdapter, deployer, brlToken, tuzToken } = await deployContractFixture();

            const { tokenId } = await createPoolAndMintPosition(
                dexAdapter,
                deployer,
                brlToken,
                tuzToken
            );

            expect(tokenId).to.not.equal(constants.AddressZero);
        });
    });

    describe("collectAllFees", () => {
        it("Should revert if called by non-owner", async () => {
            const { dexAdapter, deployer, user, brlToken, tuzToken } =
                await deployContractFixture();

            const { tokenId } = await createPoolAndMintPosition(
                dexAdapter,
                deployer,
                brlToken,
                tuzToken
            );

            await expect(
                dexAdapter.connect(user).collectAllFees(tokenId)
            ).to.be.revertedWithCustomError(dexAdapter, "OnlyOwnerError");
        });

        it("Should collect fees successfully", async () => {
            const { dexAdapter, deployer, brlToken, tuzToken } = await deployContractFixture();

            const { tokenId } = await createPoolAndMintPosition(
                dexAdapter,
                deployer,
                brlToken,
                tuzToken
            );

            await time.increase(96000);
            await performSwaps(dexAdapter, deployer, brlToken, tuzToken);
            await time.increase(96000);

            expect(await dexAdapter.connect(deployer).collectAllFees(tokenId)).to.emit(
                dexAdapter,
                "FeesCollected"
            );
        });
    });

    describe("increaseLiquidity", () => {
        it("Should revert if caller is not the owner of the position", async () => {
            const { dexAdapter, deployer, user, brlToken, tuzToken } =
                await deployContractFixture();

            const { tokenId } = await createPoolAndMintPosition(
                dexAdapter,
                deployer,
                brlToken,
                tuzToken
            );

            const amountAdd0 = ethers.utils.parseEther("50");
            const amountAdd1 = ethers.utils.parseEther("50");

            await brlToken.approve(dexAdapter.address, ethers.utils.parseEther("900"));
            await tuzToken.approve(dexAdapter.address, ethers.utils.parseEther("900"));

            await expect(
                dexAdapter.connect(user).increaseLiquidity(tokenId, amountAdd0, amountAdd1)
            ).to.be.revertedWithCustomError(dexAdapter, "OnlyOwnerError");
        });

        it("Should increase liquidity and update position information", async () => {
            const { dexAdapter, deployer, brlToken, tuzToken } = await deployContractFixture();

            const { tokenId } = await createPoolAndMintPosition(
                dexAdapter,
                deployer,
                brlToken,
                tuzToken
            );

            const amountAdd0 = ethers.utils.parseEther("50");
            const amountAdd1 = ethers.utils.parseEther("50");

            await brlToken.approve(dexAdapter.address, ethers.utils.parseEther("900"));
            await tuzToken.approve(dexAdapter.address, ethers.utils.parseEther("900"));

            const positionBefore = await dexAdapter.positions(tokenId);

            const tx = await dexAdapter.increaseLiquidity(tokenId, amountAdd0, amountAdd1);
            const result = await tx.wait();

            const liquidityIncreasedEvent = result.events!.filter((x: any) => {
                return x.event == "LiquidityIncreased";
            });

            const positionAfter = await dexAdapter.positions(tokenId);
            const newLiquidity = liquidityIncreasedEvent[0].args?.liquidity;

            expect(
                (Number(positionAfter.liquidity) - Number(positionBefore.liquidity)).toString()
            ).to.be.closeTo(newLiquidity, newLiquidity.div(10));
        });
    });

    describe("decreaseLiquidity", () => {
        it("Should revert if caller is not the owner of the position", async () => {
            const { dexAdapter, deployer, user, brlToken, tuzToken } =
                await deployContractFixture();

            const { tokenId } = await createPoolAndMintPosition(
                dexAdapter,
                deployer,
                brlToken,
                tuzToken
            );

            await expect(
                dexAdapter.connect(user).decreaseLiquidity(tokenId, 100)
            ).to.be.revertedWithCustomError(dexAdapter, "OnlyOwnerError");
        });

        it("Should decrease liquidity and update position information", async () => {
            const { dexAdapter, deployer, brlToken, tuzToken } = await deployContractFixture();

            const { tokenId } = await createPoolAndMintPosition(
                dexAdapter,
                deployer,
                brlToken,
                tuzToken
            );

            const liquidity = ethers.utils.parseEther("50");

            expect(await dexAdapter.decreaseLiquidity(tokenId, liquidity)).to.emit(
                dexAdapter,
                "LiquidityDecrease"
            );
        });
    });

    describe("swapExactInput", () => {
        it("Should revert if amount in more allowed", async () => {
            const { dexAdapter, deployer, brlToken, tuzToken } = await deployContractFixture();

            await createPoolAndMintPosition(dexAdapter, deployer, brlToken, tuzToken);

            const tokenIn = brlToken.address;
            const tokenOut = tuzToken.address;
            const amountIn = ethers.utils.parseEther("2100");
            const amountOutMinimum = 0;
            const fee = 500;

            const path = ethers.utils.solidityPack(
                ["address", "uint24", "address"],
                [tokenIn, fee, tokenOut]
            );

            await expect(
                dexAdapter
                    .connect(deployer)
                    .swapExactInput(tokenIn, amountIn, amountOutMinimum, path)
            ).to.be.revertedWithCustomError(dexAdapter, "InsufficientAllowanceError");
        });

        it("Should swap exact input successfully", async () => {
            const { dexAdapter, deployer, brlToken, tuzToken } = await deployContractFixture();

            await createPoolAndMintPosition(dexAdapter, deployer, brlToken, tuzToken);

            const tokenIn = brlToken.address;
            const tokenOut = tuzToken.address;
            const amountIn = ethers.utils.parseEther("100");
            const amountOutMinimum = 0;
            const fee = 500;

            const path = ethers.utils.solidityPack(
                ["address", "uint24", "address"],
                [tokenIn, fee, tokenOut]
            );

            const tx = await dexAdapter
                .connect(deployer)
                .swapExactInput(tokenIn, amountIn, amountOutMinimum, path);

            await expect(tx).to.emit(dexAdapter, "SwapSuccess");
        });
    });

    describe("swapExactOutput", () => {
        it("Should revert if amount in more allowed", async () => {
            const { dexAdapter, deployer, brlToken, tuzToken } = await deployContractFixture();

            await createPoolAndMintPosition(dexAdapter, deployer, brlToken, tuzToken);

            const tokenIn = brlToken.address;
            const tokenOut = tuzToken.address;
            const amountOut = ethers.utils.parseEther("2100");
            const amountInMaximum = ethers.utils.parseEther("20");
            const fee = 500;

            const path = ethers.utils.solidityPack(
                ["address", "uint24", "address"],
                [tokenIn, fee, tokenOut]
            );

            await brlToken.approve(dexAdapter.address, ethers.utils.parseEther("1000"));
            await tuzToken.approve(dexAdapter.address, ethers.utils.parseEther("1000"));

            await expect(
                dexAdapter
                    .connect(deployer)
                    .swapExactOutput(tokenOut, amountOut, amountInMaximum, path)
            ).to.be.revertedWithCustomError(dexAdapter, "InsufficientAllowanceError");
        });

        it("Should swap exact output successfully", async () => {
            const { dexAdapter, deployer, brlToken, tuzToken } = await deployContractFixture();

            await createPoolAndMintPosition(dexAdapter, deployer, brlToken, tuzToken);

            const tokenIn = brlToken.address;
            const tokenOut = tuzToken.address;
            const amountOut = ethers.utils.parseEther("10");
            const amountInMaximum = ethers.utils.parseEther("20");
            const fee = 500;

            const path = ethers.utils.solidityPack(
                ["address", "uint24", "address"],
                [tokenIn, fee, tokenOut]
            );

            await brlToken.approve(dexAdapter.address, ethers.utils.parseEther("1000"));
            await tuzToken.approve(dexAdapter.address, ethers.utils.parseEther("1000"));

            const tx = await dexAdapter
                .connect(deployer)
                .swapExactOutput(tokenOut, amountOut, amountInMaximum, path);

            await expect(tx).to.emit(dexAdapter, "SwapSuccess");
        });
    });
});
