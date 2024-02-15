import { expect } from "chai";
import { ethers } from "hardhat";

const VESTING_DURATION = 60 * 60 * 24 * 30 * 4;

describe("Vesting", () => {
    const deployContractFixture = async () => {
        const signers = await ethers.getSigners();
        const deployer = signers[0];
        const user = signers[1];

        const VestingFactory = await ethers.getContractFactory("Vesting");
        const ERC20ContractFactory = await ethers.getContractFactory("ERC20");

        const vestingToken = await ERC20ContractFactory.connect(deployer).deploy(
            "Burlan",
            "BRL",
            18,
            ethers.utils.parseEther("10000"),
            deployer.address
        );

        const vestingContract = await VestingFactory.connect(deployer).deploy(vestingToken.address);

        await vestingToken
            .connect(deployer)
            .transfer(vestingContract.address, ethers.utils.parseEther("1000"));

        return { deployer, user, vestingContract, vestingToken };
    };

    describe("DistributeRights", () => {
        it("Should revert if called after vesting period is over", async () => {
            const { vestingContract, deployer } = await deployContractFixture();

            await ethers.provider.send("evm_increaseTime", [86401]);

            await expect(
                vestingContract.connect(deployer).distributeRights(deployer.address, 100)
            ).to.be.revertedWithCustomError(vestingContract, "DistributePeriodOver");
        });

        it("Should revert if amount is 0", async () => {
            const { vestingContract, deployer } = await deployContractFixture();

            await expect(
                vestingContract.connect(deployer).distributeRights(deployer.address, 0)
            ).to.be.revertedWithCustomError(vestingContract, "ZeroAmountError");
        });

        it("Should revert if rights already distributed to the account", async () => {
            const { vestingContract, deployer } = await deployContractFixture();

            await vestingContract.connect(deployer).distributeRights(deployer.address, 100);

            await expect(
                vestingContract.connect(deployer).distributeRights(deployer.address, 200)
            ).to.be.revertedWithCustomError(vestingContract, "RightsAlreadyDistributed");
        });

        it("Should distribute rights correctly", async () => {
            const { vestingContract, deployer } = await deployContractFixture();

            const amount = 100;
            await expect(
                vestingContract.connect(deployer).distributeRights(deployer.address, amount)
            ).to.emit(vestingContract, "RightsDistributed");
        });
    });

    describe("getAvailableAmount", () => {
        it("Should revert if vesting has not started yet", async () => {
            const { vestingContract, deployer } = await deployContractFixture();

            await ethers.provider.send("evm_increaseTime", [-86401]);

            await expect(
                vestingContract.getAvailableAmount(deployer.address)
            ).to.be.revertedWithCustomError(vestingContract, "VestingNotStarted");
        });

        it("Should revert if no right distribute", async () => {
            const { vestingContract, deployer } = await deployContractFixture();

            await ethers.provider.send("evm_increaseTime", [86401]);
            await ethers.provider.send("evm_mine", []);

            await expect(
                vestingContract.getAvailableAmount(deployer.address)
            ).to.be.revertedWithCustomError(vestingContract, "NoRightsDistributed");
        });

        it("Should return correct available amount after 1 month vesting", async () => {
            const { vestingContract, deployer } = await deployContractFixture();

            await vestingContract.connect(deployer).distributeRights(deployer.address, 1000);

            await ethers.provider.send("evm_increaseTime", [VESTING_DURATION / 4]);
            await ethers.provider.send("evm_mine", []);

            const availableAmount = await vestingContract.getAvailableAmount(deployer.address);
            expect(availableAmount).to.equal(100);
        });

        it("Should return correct available amount after 2 month vesting", async () => {
            const { vestingContract, deployer } = await deployContractFixture();

            await vestingContract.connect(deployer).distributeRights(deployer.address, 1000);

            await ethers.provider.send("evm_increaseTime", [2 * (VESTING_DURATION / 4)]);
            await ethers.provider.send("evm_mine", []);

            const availableAmount = await vestingContract.getAvailableAmount(deployer.address);
            expect(availableAmount).to.equal(300);
        });

        it("Should return correct available amount after 3 month vesting", async () => {
            const { vestingContract, deployer } = await deployContractFixture();

            await vestingContract.connect(deployer).distributeRights(deployer.address, 1000);

            await ethers.provider.send("evm_increaseTime", [3 * (VESTING_DURATION / 4)]);
            await ethers.provider.send("evm_mine", []);

            const availableAmount = await vestingContract.getAvailableAmount(deployer.address);
            expect(availableAmount).to.equal(500);
        });

        it("Should return correct available amount after vesting over", async () => {
            const { vestingContract, deployer } = await deployContractFixture();

            await vestingContract.connect(deployer).distributeRights(deployer.address, 1000);

            await ethers.provider.send("evm_increaseTime", [VESTING_DURATION]);
            await ethers.provider.send("evm_mine", []);

            const availableAmount = await vestingContract.getAvailableAmount(deployer.address);
            expect(availableAmount).to.equal(1000);
        });
    });

    describe("withdrawTokens", () => {
        it("Should revert if no rights have been distributed", async () => {
            const { vestingContract, deployer } = await deployContractFixture();

            await ethers.provider.send("evm_increaseTime", [86401]);
            await ethers.provider.send("evm_mine", []);

            await expect(
                vestingContract.connect(deployer).withdrawTokens()
            ).to.be.revertedWithCustomError(vestingContract, "NoRightsDistributed");
        });

        it("Should transfer available tokens to the user after vesting period is over", async () => {
            const { vestingContract, deployer, vestingToken } = await deployContractFixture();

            await vestingContract.connect(deployer).distributeRights(deployer.address, 1000);

            await ethers.provider.send("evm_increaseTime", [VESTING_DURATION + 1]);
            await ethers.provider.send("evm_mine", []);

            const userBalanceBefore = await vestingToken.balanceOf(deployer.address);

            await vestingContract.connect(deployer).withdrawTokens();

            const userBalanceAfter = await vestingToken.balanceOf(deployer.address);
            const expectedBalanceAfter = userBalanceBefore.add(1000); // Assuming 1000 tokens were distributed

            expect(userBalanceAfter).to.equal(expectedBalanceAfter);
        });
    });
});
