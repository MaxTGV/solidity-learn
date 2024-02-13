import { expect } from "chai";
import { ethers } from "hardhat";

describe("Staking unit tests", () => {
    const deployContractFixture = async () => {
        const signers = await ethers.getSigners();
        const deployer = signers[0];
        const user = signers[1];

        const StakingFactory = await ethers.getContractFactory("Staking");
        const ERC20ContractFactory = await ethers.getContractFactory("ERC20");

        const depositToken = await ERC20ContractFactory.connect(deployer).deploy(
            "Burlan",
            "BRL",
            18,
            ethers.utils.parseEther("10000"),
            deployer.address
        );

        const rewardToken = await ERC20ContractFactory.connect(deployer).deploy(
            "Tuzan",
            "TUZ",
            18,
            ethers.utils.parseEther("10000"),
            deployer.address
        );

        const stakingContract = await StakingFactory.connect(deployer).deploy(
            depositToken.address,
            rewardToken.address,
            1000000,
            18
        );

        await depositToken
            .connect(deployer)
            .transfer(user.address, ethers.utils.parseEther("1000"));

        await rewardToken
            .connect(deployer)
            .transfer(stakingContract.address, ethers.utils.parseEther("5000"));

        return { deployer, stakingContract, depositToken, rewardToken, user };
    };

    describe("Deposit", () => {
        it("Should revert if the user tries to deposit 0 tokens", async () => {
            const { stakingContract, user } = await deployContractFixture();

            await expect(stakingContract.connect(user).deposit(0)).to.be.revertedWithCustomError(
                stakingContract,
                "ZeroAmountError"
            );
        });

        it("There should be a return if the user tries to send more than allowed", async () => {
            const { stakingContract, user, depositToken } = await deployContractFixture();

            const amount = ethers.utils.parseEther("100");

            await depositToken
                .connect(user)
                .approve(stakingContract.address, ethers.utils.parseEther("10"));

            await expect(
                stakingContract.connect(user).deposit(amount)
            ).to.be.revertedWithCustomError(stakingContract, "InsufficientAllowanceError");
        });

        it("There should be a return if the user tries to send more than their balance", async () => {
            const { stakingContract, user, depositToken } = await deployContractFixture();

            const amount = ethers.utils.parseEther("10001");

            await depositToken
                .connect(user)
                .approve(stakingContract.address, ethers.utils.parseEther("10001"));

            await expect(
                stakingContract.connect(user).deposit(amount)
            ).to.be.revertedWithCustomError(stakingContract, "InsufficientBalanceError");
        });

        it("Should transfer tokens from the user to the contract", async () => {
            const { stakingContract, user, depositToken } = await deployContractFixture();

            const amount = ethers.utils.parseEther("100");

            await depositToken.connect(user).approve(stakingContract.address, amount);

            await stakingContract.connect(user).deposit(amount);

            expect(await depositToken.balanceOf(stakingContract.address)).to.equal(amount);

            const deposit = await stakingContract.deposits(user.address);
            expect(deposit.amount).to.equal(amount);
            expect(deposit.timestamp).to.be.gt(0);
        });

        it("should emit a DepositMade event", async () => {
            const { stakingContract, user, depositToken } = await deployContractFixture();

            const amount = ethers.utils.parseEther("100");

            await depositToken.connect(user).approve(stakingContract.address, amount);

            await expect(stakingContract.connect(user).deposit(amount)).to.emit(
                stakingContract,
                "DepositMade"
            );
        });
    });

    describe("ClaimRewards", () => {
        it("Should revert if the user has no deposits", async () => {
            const { stakingContract, user } = await deployContractFixture();

            await expect(
                stakingContract.connect(user).claimRewards()
            ).to.be.revertedWithCustomError(stakingContract, "NoActiveDepositError");
        });

        it("Should revert if the lock period has not expired", async () => {
            const { stakingContract, user, depositToken } = await deployContractFixture();

            const amount = ethers.utils.parseEther("100");

            await depositToken.connect(user).approve(stakingContract.address, amount);
            await stakingContract.connect(user).deposit(amount);

            await expect(
                stakingContract.connect(user).claimRewards()
            ).to.be.revertedWithCustomError(stakingContract, "LockPeriodNotEndedError");
        });

        it("Should revert if the reward has already been claimed", async () => {
            const { stakingContract, user, depositToken } = await deployContractFixture();

            const amount = ethers.utils.parseEther("100");

            await depositToken.connect(user).approve(stakingContract.address, amount);
            await stakingContract.connect(user).deposit(amount);

            await ethers.provider.send("evm_increaseTime", [1000001]);

            await stakingContract.connect(user).claimRewards();

            await expect(
                stakingContract.connect(user).claimRewards()
            ).to.be.revertedWithCustomError(stakingContract, "RewardAlreadyClaimedError");
        });

        it("Should transfer reward tokens to the user", async () => {
            const { stakingContract, user, depositToken, rewardToken } =
                await deployContractFixture();

            const amount = ethers.utils.parseEther("100");

            await depositToken.connect(user).approve(stakingContract.address, amount);
            await stakingContract.connect(user).deposit(amount);

            await ethers.provider.send("evm_increaseTime", [1000001]);

            const reward = await stakingContract.calculateReward(amount);
            await rewardToken.connect(user).approve(stakingContract.address, reward);

            await expect(stakingContract.connect(user).claimRewards()).to.emit(
                stakingContract,
                "RewardClaimed"
            );
        });
    });

    describe("Withdraw", () => {
        it("Should revert if the user has no deposits", async () => {
            const { stakingContract, user } = await deployContractFixture();

            await expect(stakingContract.connect(user).withdraw()).to.be.revertedWithCustomError(
                stakingContract,
                "NoActiveDepositError"
            );
        });

        it("Should revert if the reward has not been claimed", async () => {
            const { stakingContract, user, depositToken } = await deployContractFixture();

            const amount = ethers.utils.parseEther("100");

            await depositToken.connect(user).approve(stakingContract.address, amount);
            await stakingContract.connect(user).deposit(amount);

            await expect(stakingContract.connect(user).withdraw()).to.be.revertedWithCustomError(
                stakingContract,
                "RewardNotClaimedError"
            );
        });

        it("Should transfer deposited tokens back to the user", async () => {
            const { stakingContract, user, depositToken, rewardToken } =
                await deployContractFixture();

            const amount = ethers.utils.parseEther("1000");

            await depositToken.connect(user).approve(stakingContract.address, amount);
            await stakingContract.connect(user).deposit(amount);

            await ethers.provider.send("evm_increaseTime", [1000001]);

            const reward = await stakingContract.calculateReward(amount);
            await rewardToken.connect(user).approve(stakingContract.address, reward);

            await stakingContract.connect(user).claimRewards();

            expect(await depositToken.balanceOf(user.address)).to.equal(0);

            const tx = await stakingContract.connect(user).withdraw();

            await expect(tx).to.emit(stakingContract, "Withdrawal");

            expect(await depositToken.balanceOf(user.address)).to.equal(amount);
        });
    });
});
