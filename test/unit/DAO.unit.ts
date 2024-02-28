import { expect } from "chai";
import { ethers } from "hardhat";

const proposalEndTime = 86400;
const newDebatingPeriod = proposalEndTime * 7;

describe("DAO unit tests", () => {
    const deployContractFixture = async () => {
        const signers = await ethers.getSigners();
        const [deployer, user, user2] = signers;

        const DAOFactory = await ethers.getContractFactory("DAO");
        const ERC20ContractFactory = await ethers.getContractFactory("ERC20");
        const MockFactory = await ethers.getContractFactory("Mock");

        const depositToken = await ERC20ContractFactory.connect(deployer).deploy(
            "Burlan",
            "BRL",
            18,
            ethers.utils.parseEther("10000"),
            deployer.address
        );

        await depositToken
            .connect(deployer)
            .transfer(user.address, ethers.utils.parseEther("3000"));

        await depositToken
            .connect(deployer)
            .transfer(user2.address, ethers.utils.parseEther("2000"));

        const daoContract = await DAOFactory.connect(deployer).deploy(depositToken.address);
        const mockContract = await MockFactory.connect(deployer).deploy();

        return { deployer, user, user2, daoContract, depositToken, mockContract };
    };

    describe("addProposal", () => {
        it("Should revert if called by non-owner", async () => {
            const { daoContract, user } = await deployContractFixture();
            const role = await daoContract.ADMIN_ROLE();
            await expect(
                daoContract.connect(user).addProposal(user.address, "Test Proposal", "0x")
            ).to.be.revertedWith(
                `AccessControl: account ${user.address.toLowerCase()} is missing role ${role}`
            );
        });

        it("Should add new proposal", async () => {
            const { daoContract, deployer } = await deployContractFixture();
            await daoContract
                .connect(deployer)
                .addProposal(ethers.constants.AddressZero, "Test Proposal", "0x");

            const proposal = await daoContract.proposals(0);
            expect(proposal.description).to.equal("Test Proposal");
            expect(proposal.callData).to.equal("0x");
            expect(proposal.recipient).to.equal(ethers.constants.AddressZero);
            expect(proposal.votesFor).to.equal(0);
            expect(proposal.votesAgainst).to.equal(0);
        });

        it("Should emit ProposalAdded event", async () => {
            const { daoContract, deployer } = await deployContractFixture();
            await expect(
                daoContract
                    .connect(deployer)
                    .addProposal(ethers.constants.AddressZero, "Test Proposal", "0x")
            ).to.emit(daoContract, "ProposalAdded");
        });
    });

    describe("deposit", () => {
        it("Should revert if deposit amount is zero", async () => {
            const { daoContract, user } = await deployContractFixture();
            await expect(daoContract.connect(user).deposit(0)).to.be.revertedWithCustomError(
                daoContract,
                "ZeroAmountError"
            );
        });

        it("Should transfer tokens to the contract and store deposit information", async () => {
            const { daoContract, deployer, depositToken } = await deployContractFixture();
            const depositAmount = ethers.utils.parseEther("200");
            const partDeposit = ethers.utils.parseEther("100");

            await depositToken.connect(deployer).approve(daoContract.address, depositAmount);

            await expect(daoContract.connect(deployer).deposit(partDeposit))
                .to.emit(daoContract, "DepositMade")
                .withArgs(deployer.address, partDeposit);

            const depositInfo = await daoContract.deposits(deployer.address);
            expect(depositInfo.amount).to.equal(partDeposit);
            expect(depositInfo.lockedTime).to.be.gt(0);

            const contractBalance = await depositToken.balanceOf(daoContract.address);
            expect(contractBalance).to.equal(partDeposit);

            await daoContract.connect(deployer).deposit(partDeposit);

            const depositInfoUpdate = await daoContract.deposits(deployer.address);
            expect(depositInfoUpdate.amount).to.equal(depositAmount);

            const contractBalanceUpdate = await depositToken.balanceOf(daoContract.address);
            expect(contractBalanceUpdate).to.equal(depositAmount);
        });
    });

    describe("withdraw", () => {
        it("Should revert if user is participating in voting", async () => {
            const { daoContract, deployer, depositToken } = await deployContractFixture();

            await daoContract
                .connect(deployer)
                .addProposal(ethers.constants.AddressZero, "Test Proposal", "0x");

            const depositAmount = ethers.utils.parseEther("100");

            await depositToken.connect(deployer).approve(daoContract.address, depositAmount);
            await daoContract.connect(deployer).deposit(depositAmount);
            await daoContract.connect(deployer).vote(0, true);

            await expect(daoContract.connect(deployer).withdraw()).to.be.revertedWithCustomError(
                daoContract,
                "VotingInProgress"
            );
        });

        it("Should revert if user has no active deposit", async () => {
            const { daoContract, user } = await deployContractFixture();

            await expect(daoContract.connect(user).withdraw()).to.be.revertedWithCustomError(
                daoContract,
                "NoActiveDeposit"
            );
        });

        it("Should transfer deposited tokens back to the user", async () => {
            const { daoContract, deployer, depositToken } = await deployContractFixture();

            const depositAmount = ethers.utils.parseEther("100");
            await depositToken.connect(deployer).approve(daoContract.address, depositAmount);

            await daoContract.deposit(depositAmount);

            const tx = await daoContract.connect(deployer).withdraw();

            await expect(tx)
                .to.emit(daoContract, "Withdrawal")
                .withArgs(deployer.address, depositAmount);
        });
    });

    describe("vote", () => {
        it("Should revert if proposal does not exist", async () => {
            const { daoContract, user } = await deployContractFixture();

            await expect(daoContract.connect(user).vote(0, true)).to.be.revertedWithCustomError(
                daoContract,
                "ProposalDoesNotExist"
            );
        });

        it("Should revert if user has insufficient votes", async () => {
            const { daoContract, deployer, user } = await deployContractFixture();

            await daoContract
                .connect(deployer)
                .addProposal(ethers.constants.AddressZero, "Test Proposal", "0x");

            await expect(daoContract.connect(user).vote(0, true)).to.be.revertedWithCustomError(
                daoContract,
                "InsufficientVotes"
            );
        });

        it("Should revert if voting has ended", async () => {
            const { daoContract, deployer, depositToken } = await deployContractFixture();

            await daoContract
                .connect(deployer)
                .addProposal(ethers.constants.AddressZero, "Test Proposal", "0x");

            const depositAmount = ethers.utils.parseEther("100");
            await depositToken.connect(deployer).approve(daoContract.address, depositAmount);

            await daoContract.connect(deployer).deposit(depositAmount);

            await daoContract.connect(deployer).setProposalSuccess(0, true);

            await expect(daoContract.connect(deployer).vote(0, true)).to.be.revertedWithCustomError(
                daoContract,
                "VotingEnded"
            );
        });

        it("Should revert if user has already voted", async () => {
            const { daoContract, deployer, depositToken } = await deployContractFixture();

            await daoContract
                .connect(deployer)
                .addProposal(ethers.constants.AddressZero, "Test Proposal", "0x");

            const depositAmount = ethers.utils.parseEther("100");
            await depositToken.connect(deployer).approve(daoContract.address, depositAmount);

            await daoContract.connect(deployer).deposit(depositAmount);

            await daoContract.connect(deployer).vote(0, true);

            await expect(
                daoContract.connect(deployer).vote(0, false)
            ).to.be.revertedWithCustomError(daoContract, "AlreadyVoted");
        });

        it("Should emit ProposalVoted event For", async () => {
            const { daoContract, deployer, depositToken } = await deployContractFixture();

            await daoContract
                .connect(deployer)
                .addProposal(ethers.constants.AddressZero, "Test Proposal", "0x");

            const depositAmount = ethers.utils.parseEther("100");
            await depositToken.connect(deployer).approve(daoContract.address, depositAmount);

            await daoContract.connect(deployer).deposit(depositAmount);

            await expect(daoContract.connect(deployer).vote(0, true))
                .to.emit(daoContract, "ProposalVoted")
                .withArgs(0, deployer.address, true);
        });

        it("Should emit ProposalVoted and change locked time", async () => {
            const { daoContract, deployer, depositToken, mockContract } =
                await deployContractFixture();

            await daoContract.connect(deployer).setDebatingPeriod(newDebatingPeriod);

            await daoContract
                .connect(deployer)
                .addProposal(ethers.constants.AddressZero, "Test Proposal", "0x");

            const depositAmount = ethers.utils.parseEther("100");

            await depositToken.connect(deployer).approve(daoContract.address, depositAmount);
            await daoContract.connect(deployer).deposit(depositAmount);
            await daoContract.connect(deployer).vote(0, true);

            const currentLockedTime = await daoContract.deposits(deployer.address);
            const firstProposalsEndTime = await daoContract.proposals(0);

            expect(currentLockedTime.lockedTime).to.equal(firstProposalsEndTime.proposalEndTime);

            await daoContract.connect(deployer).setDebatingPeriod(proposalEndTime);

            await daoContract
                .connect(deployer)
                .addProposal(mockContract.address, "Test Proposal2", "0x");

            await daoContract.connect(deployer).vote(1, true);

            const newLockedTime = await daoContract.deposits(deployer.address);
            const secondProposalsEndTime = await daoContract.proposals(1);

            expect(newLockedTime.lockedTime).to.equal(firstProposalsEndTime.proposalEndTime);
            expect(newLockedTime.lockedTime).not.to.equal(secondProposalsEndTime.proposalEndTime);
        });
    });

    describe("finishProposal", () => {
        it("Should revert if the proposal end time has not been reached", async () => {
            const { daoContract, deployer, depositToken } = await deployContractFixture();
            const proposalId = 0;

            await daoContract
                .connect(deployer)
                .addProposal(ethers.constants.AddressZero, "Test Proposal", "0x");

            const depositAmount = ethers.utils.parseEther("100");
            await depositToken.connect(deployer).approve(daoContract.address, depositAmount);

            await daoContract.connect(deployer).deposit(depositAmount);

            await daoContract.connect(deployer).vote(proposalId, false);

            await expect(
                daoContract.connect(deployer).finishProposal(proposalId)
            ).to.be.revertedWithCustomError(daoContract, "ProposalNotEnded");
        });

        it("Should revert if the proposal has already been executed", async () => {
            const { daoContract, deployer } = await deployContractFixture();
            const proposalId = 0;

            await daoContract
                .connect(deployer)
                .addProposal(ethers.constants.AddressZero, "Test Proposal", "0x");

            await ethers.provider.send("evm_increaseTime", [proposalEndTime]);

            await daoContract.connect(deployer).setProposalSuccess(0, true);

            await expect(
                daoContract.connect(deployer).finishProposal(proposalId)
            ).to.be.revertedWithCustomError(daoContract, "ProposalAlreadyExecuted");
        });

        it("Should revert if there are no votes", async () => {
            const { daoContract, deployer } = await deployContractFixture();
            const proposalId = 0;

            await daoContract
                .connect(deployer)
                .addProposal(ethers.constants.AddressZero, "Test Proposal", "0x");

            await ethers.provider.send("evm_increaseTime", [proposalEndTime]);

            await expect(
                daoContract.connect(deployer).finishProposal(proposalId)
            ).to.be.revertedWithCustomError(daoContract, "InsufficientVotes");
        });

        it("Should execute the proposal if the total votes less then quorum", async () => {
            const { daoContract, deployer, depositToken } = await deployContractFixture();
            const proposalId = 0;

            await daoContract
                .connect(deployer)
                .addProposal(ethers.constants.AddressZero, "Test Proposal", "0x");

            const depositAmount = ethers.utils.parseEther("5000");
            await depositToken.connect(deployer).approve(daoContract.address, depositAmount);

            await daoContract.connect(deployer).deposit(depositAmount);

            await daoContract.connect(deployer).vote(proposalId, false);

            await ethers.provider.send("evm_increaseTime", [proposalEndTime]);

            const tx = await daoContract.connect(deployer).finishProposal(proposalId);

            const proposal = await daoContract.proposals(proposalId);
            expect(proposal.executed).to.be.false;

            await expect(tx).to.not.emit(daoContract, "ProposalSucceeded");
            await expect(tx).to.not.emit(daoContract, "ProposalExecuted");
        });

        it("Should execute the proposal if the total votes more then quorum", async () => {
            const { daoContract, deployer, user, depositToken } = await deployContractFixture();
            const proposalId = 0;

            await daoContract
                .connect(deployer)
                .addProposal(ethers.constants.AddressZero, "Test Proposal", "0x");

            const depositAmount1 = ethers.utils.parseEther("5000");
            const depositAmount2 = ethers.utils.parseEther("3000");
            await depositToken.connect(deployer).approve(daoContract.address, depositAmount1);
            await depositToken.connect(user).approve(daoContract.address, depositAmount2);

            await daoContract.connect(deployer).deposit(depositAmount1);
            await daoContract.connect(user).deposit(depositAmount2);

            await daoContract.connect(deployer).vote(proposalId, false);
            await daoContract.connect(user).vote(proposalId, false);

            await ethers.provider.send("evm_increaseTime", [proposalEndTime]);

            const tx = await daoContract.connect(deployer).finishProposal(proposalId);

            const proposal = await daoContract.proposals(proposalId);
            expect(proposal.executed).to.be.true;

            await expect(tx).to.not.emit(daoContract, "ProposalSucceeded");
            await expect(tx).to.emit(daoContract, "ProposalExecuted");
        });

        it("Should revert if the call to the proposal function fails", async () => {
            const { daoContract, deployer, user, depositToken, mockContract } =
                await deployContractFixture();
            const proposalId = 0;

            await daoContract
                .connect(deployer)
                .addProposal(mockContract.address, "Test Proposal", "0x");

            const depositAmount1 = ethers.utils.parseEther("5000");
            const depositAmount2 = ethers.utils.parseEther("3000");
            await depositToken.connect(deployer).approve(daoContract.address, depositAmount1);
            await depositToken.connect(user).approve(daoContract.address, depositAmount2);

            await daoContract.connect(deployer).deposit(depositAmount1);
            await daoContract.connect(user).deposit(depositAmount2);

            await daoContract.connect(deployer).vote(proposalId, true);
            await daoContract.connect(user).vote(proposalId, true);

            await ethers.provider.send("evm_increaseTime", [proposalEndTime]);

            await expect(
                daoContract.connect(deployer).finishProposal(proposalId)
            ).to.be.revertedWithCustomError(daoContract, "CallToProposalFailed");
        });

        it("Should revert if the call to the proposal function success", async () => {
            const { daoContract, deployer, user, depositToken } = await deployContractFixture();
            const proposalId = 0;

            await daoContract
                .connect(deployer)
                .addProposal(ethers.constants.AddressZero, "Test Proposal", "0x");

            const depositAmount1 = ethers.utils.parseEther("5000");
            const depositAmount2 = ethers.utils.parseEther("3000");
            await depositToken.connect(deployer).approve(daoContract.address, depositAmount1);
            await depositToken.connect(user).approve(daoContract.address, depositAmount2);

            await daoContract.connect(deployer).deposit(depositAmount1);
            await daoContract.connect(user).deposit(depositAmount2);

            await daoContract.connect(deployer).vote(proposalId, true);
            await daoContract.connect(user).vote(proposalId, true);

            await ethers.provider.send("evm_increaseTime", [proposalEndTime]);

            await expect(daoContract.connect(deployer).finishProposal(proposalId)).to.emit(
                daoContract,
                "ProposalSucceeded"
            );
        });
    });

    describe("setMinimalQuorum", () => {
        it("Should revert if called by non-admin", async () => {
            const { daoContract, user } = await deployContractFixture();
            const role = await daoContract.ADMIN_ROLE();
            await expect(daoContract.connect(user).setMinimalQuorum(50)).to.be.revertedWith(
                `AccessControl: account ${user.address.toLowerCase()} is missing role ${role}`
            );
        });

        it("Should revert if new quorum is zero", async () => {
            const { daoContract, deployer } = await deployContractFixture();
            await expect(
                daoContract.connect(deployer).setMinimalQuorum(0)
            ).to.be.revertedWithCustomError(daoContract, "InvalidQuorumPercentage");
        });

        it("Should revert if new quorum is greater than 100", async () => {
            const { daoContract, deployer } = await deployContractFixture();
            await expect(
                daoContract.connect(deployer).setMinimalQuorum(101)
            ).to.be.revertedWithCustomError(daoContract, "InvalidQuorumPercentage");
        });

        it("Should set new quorum", async () => {
            const { daoContract, deployer, depositToken } = await deployContractFixture();
            const totalSupply = await depositToken.totalSupply();
            await daoContract.connect(deployer).setMinimalQuorum(100);
            expect(await daoContract.minimalQuorum()).to.equal(totalSupply);
        });
    });

    describe("setDebatingPeriod", () => {
        it("Should revert if called by non-admin", async () => {
            const { daoContract, user } = await deployContractFixture();
            const role = await daoContract.ADMIN_ROLE();
            await expect(daoContract.connect(user).setDebatingPeriod(7)).to.be.revertedWith(
                `AccessControl: account ${user.address.toLowerCase()} is missing role ${role}`
            );
        });

        it("Should set new debating period", async () => {
            const { daoContract, deployer } = await deployContractFixture();
            await daoContract.connect(deployer).setDebatingPeriod(7);
            expect(await daoContract.debatingPeriod()).to.equal(7);
        });
    });
});
