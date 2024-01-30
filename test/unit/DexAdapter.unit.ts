import { ethers } from "hardhat";
import { expect } from "chai";
import bn from "bignumber.js";
import { BigNumberish, BigNumber, constants, utils } from "ethers";

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

// // Функция для создания пула и добавления ликвидности
// async function createPoolAndMintPosition(
//     dexAdapter: DexAdapter,
//     user: SignerWithAddress,
//     brlToken: ERC20,
//     tuzToken: ERC20
// ) {
//     // Создание пула
//     const fee = 500;
//     const sqrtPriceX96 = encodePriceSqrt(utils.parseUnits("1", 18), utils.parseUnits("1", 18));
//     const [sortedTokenA, sortedTokenB] = await dexAdapter._sortTokens(
//         brlToken.address,
//         tuzToken.address
//     );
//     await dexAdapter.connect(user).createPool(sortedTokenA, sortedTokenB, fee, sqrtPriceX96);

//     // Добавление ликвидности
//     const amount0ToMint = utils.parseUnits("1000", 18);
//     const amount1ToMint = utils.parseUnits("1000", 18);
//     const minTick = -887220;
//     const maxTick = 887220;
//     const tx = await dexAdapter
//         .connect(user)
//         .mintNewPosition(
//             sortedTokenA,
//             sortedTokenB,
//             fee,
//             amount0ToMint,
//             amount1ToMint,
//             minTick,
//             maxTick
//         );
//     const receipt = await tx.wait();
//     const tokenId = receipt?.events && receipt?.events[0]?.args?.tokenId;

//     return { tokenId };
// }

// // Функция для выполнения свопов
// async function performSwaps(
//     dexAdapter: DexAdapter,
//     user: SignerWithAddress,
//     brlToken: ERC20,
//     tuzToken: ERC20
// ) {
//     const amountIn = utils.parseUnits("100", 18);
//     const amountOutMinimum = 1;
//     const path = [brlToken.address, tuzToken.address];
//     const sqrtPriceX96 = encodePriceSqrt(utils.parseUnits("1", 18), utils.parseUnits("1", 18));

//     // Получаем адрес пула
//     const poolAddress = await dexAdapter.createPool(
//         brlToken.address,
//         tuzToken.address,
//         500,
//         sqrtPriceX96
//     );
//     expect(poolAddress).to.not.equal(constants.AddressZero);

//     // Выполняем своп
//     await brlToken.connect(user).approve(dexAdapter.address, amountIn);
//     // const tx = await dexAdapter
//     //     .connect(user)
//     //     .swapExactInput(brlToken.address, amountIn, amountOutMinimum, path);
//     // await tx.wait();
// }

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
            ethers.utils.parseEther("1000"),
            deployer.address
        );

        const tuzToken = await ERC20ContractFactory.connect(deployer).deploy(
            "Tuzan",
            "TUZ",
            18,
            ethers.utils.parseEther("1000"),
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
            const sqrtPriceX96 = encodePriceSqrt(
                utils.parseUnits("1", 18),
                utils.parseUnits("1", 18)
            );

            await expect(
                dexAdapter.connect(user).createPool(tokenA, tokenB, fee, sqrtPriceX96)
            ).to.be.revertedWithCustomError(dexAdapter, "OnlyOwnerError");
        });

        it("Should revert if tokens have identical address", async () => {
            const { dexAdapter, deployer, brlToken } = await deployContractFixture();

            const tokenA = brlToken.address;
            const tokenB = brlToken.address;
            const fee = 500;
            const sqrtPriceX96 = encodePriceSqrt(
                utils.parseUnits("1", 18),
                utils.parseUnits("1", 18)
            );

            await expect(
                dexAdapter.connect(deployer).createPool(tokenA, tokenB, fee, sqrtPriceX96)
            ).to.be.revertedWithCustomError(dexAdapter, "IdenticalAddressesError");
        });

        it("Should create pool successfully", async () => {
            const { dexAdapter, deployer, brlToken, tuzToken } = await deployContractFixture();

            const tokenA = brlToken.address;
            const tokenB = tuzToken.address;
            const fee = 500;
            const sqrtPriceX96 = encodePriceSqrt(
                utils.parseUnits("1", 18),
                utils.parseUnits("1", 18)
            );

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

            const tokenA = brlToken.address;
            const tokenB = tuzToken.address;
            const fee = 500;
            const amount0ToMint = ethers.utils.parseEther("100");
            const amount1ToMint = ethers.utils.parseEther("100");
            const minTick = -885000;
            const maxTick = 885000;
            const sqrtPriceX96 = encodePriceSqrt(1, 1);

            await dexAdapter.connect(deployer).createPool(tokenA, tokenB, fee, sqrtPriceX96);

            await brlToken.approve(dexAdapter.address, ethers.utils.parseEther("900"));
            await tuzToken.approve(dexAdapter.address, ethers.utils.parseEther("900"));

            console.log("brl", await brlToken.balanceOf(deployer.address));
            console.log("tuz", await tuzToken.balanceOf(deployer.address));

            console.log("brl before", await brlToken.balanceOf(dexAdapter.address));

            await expect(
                dexAdapter
                    .connect(deployer)
                    .mintNewPosition(
                        tokenA,
                        tokenB,
                        fee,
                        amount0ToMint,
                        amount1ToMint,
                        minTick,
                        maxTick
                    )
            ).to.emit(dexAdapter, "PositionMinted");

            console.log("brl after", await brlToken.balanceOf(dexAdapter.address));
        });
    });

    // describe("collectAllFees", () => {
    //     it("Should revert if the caller is not the owner of the position", async () => {
    //         const { dexAdapter, deployer, user, brlToken, tuzToken } =
    //             await deployContractFixture();
    //         const { tokenId } = await createPoolAndMintPosition(
    //             dexAdapter,
    //             deployer,
    //             brlToken,
    //             tuzToken
    //         );

    //         await expect(
    //             dexAdapter.connect(user).collectAllFees(tokenId)
    //         ).to.be.revertedWithCustomError(dexAdapter, "OnlyOwnerError");
    //     });

    //     it("Should collect fees successfully", async () => {
    //         const { dexAdapter, deployer, user, brlToken, tuzToken } =
    //             await deployContractFixture();
    //         const { tokenId } = await createPoolAndMintPosition(
    //             dexAdapter,
    //             user,
    //             brlToken,
    //             tuzToken
    //         );

    //         // Perform swaps to generate fees
    //         await performSwaps(dexAdapter, user, brlToken, tuzToken);

    //         // Approve transfer of token to the contract
    //         await brlToken.connect(user).approve(dexAdapter.address, constants.MaxUint256);
    //         await tuzToken.connect(user).approve(dexAdapter.address, constants.MaxUint256);

    //         // Collect fees
    //         const tx = await dexAdapter.connect(deployer).collectAllFees(tokenId);
    //         const receipt = await tx.wait();

    //         // Check for emitted event
    //         expect(receipt.events?.length).to.be.greaterThan(0);
    //         const event = receipt.events?.[0];
    //         expect(event?.event).to.equal("FeesCollected");

    //         // Check amounts collected
    //         const amount0 = event?.args?.amount0;
    //         const amount1 = event?.args?.amount1;
    //         expect(amount0).to.not.equal(0);
    //         expect(amount1).to.not.equal(0);
    //     });
    // });

    // describe("swapExactInput", () => {
    //     it("Should swap exact input successfully", async () => {
    //         const { dexAdapter, deployer, brlToken, tuzToken } = await deployContractFixture();
    //         const tokenIn = brlToken.address;
    //         const tokenOut = tuzToken.address;
    //         const amountIn = ethers.utils.parseEther("10"); // 10 токенов входа
    //         const amountOutMinimum = 1; // Минимальное количество токенов выхода
    //         const fee = 3000; // Фиксированный размер сбора
    //         const sqrtPriceX96 = encodePriceSqrt(1, 1);
    //         const path = ethers.utils.defaultAbiCoder.encode(
    //             ["address", "uint24", "address", "uint24", "address"],
    //             [tokenOut, fee, tokenIn, fee, tokenOut]
    //         );

    //         await brlToken.connect(deployer).approve(dexAdapter.address, amountIn);
    //         const tx = await dexAdapter
    //             .connect(deployer)
    //             .swapExactInput(tokenIn, amountIn, amountOutMinimum, path);
    //     });
    // });

    // describe("swapExactOutput", () => {
    //     it("Should swap exact output successfully", async () => {
    //         const { dexAdapter, deployer, brlToken, tuzToken } = await deployContractFixture();
    //         const tokenIn = brlToken.address;
    //         const tokenOut = tuzToken.address;
    //         const amountOut = ethers.utils.parseEther("10"); // 10 токенов выхода
    //         const amountInMaximum = ethers.utils.parseEther("100"); // Максимальное количество токенов входа
    //         const fee = 3000; // Фиксированный размер сбора
    //         const sqrtPriceX96 = encodePriceSqrt(1, 1);
    //         const path = ethers.utils.defaultAbiCoder.encode(
    //             ["address", "uint24", "address", "uint24", "address"],
    //             [tokenOut, fee, tokenIn, fee, tokenOut]
    //         );

    //         await brlToken.connect(deployer).approve(dexAdapter.address, amountInMaximum);
    //         const tx = await dexAdapter
    //             .connect(deployer)
    //             .swapExactOutput(tokenIn, amountOut, amountInMaximum, path);
    //     });
    // });
});
