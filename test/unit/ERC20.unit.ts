import { ethers } from "hardhat";
import { expect } from "chai";

describe("ERC20 unit tests", () => {
    const deployContractFixture = async () => {
        const signers = await ethers.getSigners();
        const deployer = signers[0];
        const owner = signers[1];
        const user = signers[2];

        const erc20ContractFactory = await ethers.getContractFactory("ERC20");
        const tokenByERC20 = await erc20ContractFactory
            .connect(deployer)
            .deploy("Burlan", "BRL", 18, 1000000, owner.address);
        return { owner, user, deployer, tokenByERC20 };
    };

    describe("Contract initialization", () => {
        it("Should have correct name, symbol, and decimals", async () => {
            const { tokenByERC20 } = await deployContractFixture();
            expect(await tokenByERC20.name()).to.equal("Burlan");
            expect(await tokenByERC20.symbol()).to.equal("BRL");
            expect(await tokenByERC20.decimals()).to.equal(18);
        });

        it("Should have correct total supply", async () => {
            const { tokenByERC20 } = await deployContractFixture();
            expect(await tokenByERC20.totalSupply()).to.equal(1000000);
        });
    });

    describe("Checking basic information", () => {
        it("Should return correct balance for user", async () => {
            const { owner, tokenByERC20 } = await deployContractFixture();
            const balance = await tokenByERC20.balanceOf(owner.address);
            expect(balance).to.equal(1000000);
        });

        it("Should return correct allowance for spender", async () => {
            const { user, owner, tokenByERC20 } = await deployContractFixture();
            const allowance = await tokenByERC20.allowance(owner.address, user.address);
            expect(allowance).to.equal(0);
        });
    });

    describe("Transfer", () => {
        it("Should transfer tokens successfully", async () => {
            const { user, owner, tokenByERC20 } = await deployContractFixture();

            await tokenByERC20.connect(owner).transfer(user.address, 1000);

            const balance = await tokenByERC20.balanceOf(user.address);

            expect(balance).to.equal(1000);
        });

        it("Should revert if trying to transfer to zero address", async () => {
            const { owner, tokenByERC20 } = await deployContractFixture();
            await expect(
                tokenByERC20.connect(owner).transfer(ethers.constants.AddressZero, 1000)
            ).to.be.revertedWithCustomError(tokenByERC20, "TransferToZeroAddress");
        });

        it("Should revert if trying to transfer more than balance", async () => {
            const { user, owner, tokenByERC20 } = await deployContractFixture();
            await expect(
                tokenByERC20.connect(owner).transfer(user.address, 1000001)
            ).to.be.revertedWithCustomError(tokenByERC20, "TransferAmountExceedsBalance");
        });
    });

    describe("Transfer From", () => {
        it("Should transfer tokens from one account to another successfully", async () => {
            const { user, owner, tokenByERC20 } = await deployContractFixture();

            await tokenByERC20.connect(user).approve(user.address, 1000);

            await tokenByERC20.connect(owner).transferFrom(owner.address, user.address, 500);

            const ownerBalance = await tokenByERC20.balanceOf(owner.address);
            const userBalance = await tokenByERC20.balanceOf(user.address);

            expect(ownerBalance).to.equal(1000000 - 500);
            expect(userBalance).to.equal(500);
        });

        it("Should revert if trying to transferFrom to zero address", async () => {
            const { owner, user, tokenByERC20 } = await deployContractFixture();

            await tokenByERC20.connect(owner).approve(user.address, 500);

            await expect(
                tokenByERC20
                    .connect(owner)
                    .transferFrom(owner.address, ethers.constants.AddressZero, 500)
            ).to.be.revertedWithCustomError(tokenByERC20, "TransferToZeroAddress");
        });

        it("Should revert if amount exceeds allowance during transferFrom", async () => {
            const { owner, user, tokenByERC20 } = await deployContractFixture();

            await tokenByERC20.connect(owner).approve(user.address, 500);

            await expect(
                tokenByERC20.connect(owner).transferFrom(owner.address, user.address, 501)
            ).to.be.revertedWithCustomError(tokenByERC20, "AmountExceedsApproveBalance");
        });
    });

    describe("Approve", () => {
        it("Should approve spending tokens successfully", async () => {
            const { owner, user, tokenByERC20 } = await deployContractFixture();

            await tokenByERC20.connect(owner).approve(user.address, 500);

            const allowance = await tokenByERC20.allowance(owner.address, user.address);
            expect(allowance).to.equal(500);
        });

        it("Should revert if approving to zero address", async () => {
            const { owner, tokenByERC20 } = await deployContractFixture();

            await expect(
                tokenByERC20.connect(owner).approve(ethers.constants.AddressZero, 500)
            ).to.be.revertedWithCustomError(tokenByERC20, "ApproveToZeroAddress");
        });
    });

    describe("Increase allowance", () => {
        it("Should increase allowance successfully", async () => {
            const { owner, user, tokenByERC20 } = await deployContractFixture();

            await tokenByERC20.connect(owner).approve(user.address, 500);

            await tokenByERC20.connect(owner).increaseAllowance(user.address, 300);

            const allowance = await tokenByERC20.allowance(owner.address, user.address);
            expect(allowance).to.equal(800);
        });

        it("Should revert if increasing allowance to zero address", async () => {
            const { owner, tokenByERC20 } = await deployContractFixture();

            await expect(
                tokenByERC20.connect(owner).increaseAllowance(ethers.constants.AddressZero, 300)
            ).to.be.revertedWithCustomError(tokenByERC20, "ApproveToZeroAddress");
        });

        it("Should revert if not allowance ", async () => {
            const { owner, user, tokenByERC20 } = await deployContractFixture();

            await expect(
                tokenByERC20.connect(owner).increaseAllowance(user.address, 500)
            ).to.be.revertedWithCustomError(tokenByERC20, "NotApproveAmount");
        });
    });

    describe("Decrease allowance", () => {
        it("Should decrease allowance successfully", async () => {
            const { owner, user, tokenByERC20 } = await deployContractFixture();

            await tokenByERC20.connect(owner).approve(user.address, 500);
            await tokenByERC20.connect(owner).decreaseAllowance(user.address, 200);

            const allowance = await tokenByERC20.allowance(owner.address, user.address);
            expect(allowance).to.equal(300);
        });

        it("Should revert if decreasing allowance to zero address", async () => {
            const { owner, user, tokenByERC20 } = await deployContractFixture();

            await tokenByERC20.connect(owner).approve(user.address, 500);

            await expect(
                tokenByERC20.connect(owner).decreaseAllowance(ethers.constants.AddressZero, 200)
            ).to.be.revertedWithCustomError(tokenByERC20, "ApproveToZeroAddress");
        });

        it("Should revert if decreasing allowance below zero", async () => {
            const { owner, user, tokenByERC20 } = await deployContractFixture();

            await tokenByERC20.connect(owner).approve(user.address, 500);

            await expect(
                tokenByERC20.connect(owner).decreaseAllowance(user.address, 501)
            ).to.be.revertedWithCustomError(tokenByERC20, "AmountExceedsApproveBalance");
        });

        it("Should revert if not allowance ", async () => {
            const { owner, user, tokenByERC20 } = await deployContractFixture();

            await expect(
                tokenByERC20.connect(owner).decreaseAllowance(user.address, 500)
            ).to.be.revertedWithCustomError(tokenByERC20, "NotApproveAmount");
        });
    });

    describe("Mint", () => {
        it("Should mint new tokens successfully", async () => {
            const { owner, tokenByERC20 } = await deployContractFixture();

            await tokenByERC20.connect(owner).mint(owner.address, 500);

            const totalSupply = await tokenByERC20.totalSupply();
            const balance = await tokenByERC20.balanceOf(owner.address);

            expect(totalSupply).to.equal(1000500);
            expect(balance).to.equal(1000500);
        });

        it("Should revert if trying to mint to zero address", async () => {
            const { owner, tokenByERC20 } = await deployContractFixture();

            await expect(
                tokenByERC20.connect(owner).mint(ethers.constants.AddressZero, 500)
            ).to.be.revertedWithCustomError(tokenByERC20, "MintToZeroAddress");
        });

        it("Should revert if non-owner tries to mint", async () => {
            const { user, tokenByERC20 } = await deployContractFixture();

            await expect(
                tokenByERC20.connect(user).mint(user.address, 500)
            ).to.be.revertedWithCustomError(tokenByERC20, "MintOwnerOnly");
        });
    });

    describe("Burn", () => {
        it("Should burn tokens successfully", async () => {
            const { owner, tokenByERC20 } = await deployContractFixture();

            await tokenByERC20.connect(owner).burn(owner.address, 500);

            const totalSupply = await tokenByERC20.totalSupply();
            const balance = await tokenByERC20.balanceOf(owner.address);

            expect(totalSupply).to.equal(999500);
            expect(balance).to.equal(999500);
        });

        it("Should revert if trying to burn from zero address", async () => {
            const { owner, tokenByERC20 } = await deployContractFixture();
            await expect(
                tokenByERC20.connect(owner).burn(ethers.constants.AddressZero, 500)
            ).to.be.revertedWithCustomError(tokenByERC20, "BurnFromZeroAddress");
        });

        it("Should revert if amount exceeds balance during burn", async () => {
            const { owner, tokenByERC20 } = await deployContractFixture();

            await expect(
                tokenByERC20.connect(owner).burn(owner.address, 1000001)
            ).to.be.revertedWithCustomError(tokenByERC20, "BurnAmountExceedsBalance");
        });

        it("Should revert if non-owner tries to burn", async () => {
            const { user, tokenByERC20 } = await deployContractFixture();

            await expect(
                tokenByERC20.connect(user).burn(user.address, 500)
            ).to.be.revertedWithCustomError(tokenByERC20, "MintOwnerOnly");
        });
    });
});
