import { expect } from "chai";
import { ethers } from "hardhat";

const proposalEndTime = 86400;

describe("DAO unit tests", () => {
    const deployContractFixture = async () => {
        const signers = await ethers.getSigners();
        const deployer = signers[0];
        const user = signers[1];

        const DAOFactory = await ethers.getContractFactory("DAO");
        const ERC20ContractFactory = await ethers.getContractFactory("ERC20");

        const depositToken = await ERC20ContractFactory.connect(deployer).deploy(
            "Burlan",
            "BRL",
            18,
            ethers.utils.parseEther("10000"),
            deployer.address
        );

        const daoContract = await DAOFactory.connect(deployer).deploy(depositToken.address);

        return { deployer, user, daoContract, depositToken };
    };

    describe("addProposal", () => {
        it("Should revert if called by non-owner", async () => {
            const { daoContract, user } = await deployContractFixture();
            await expect(
                daoContract.connect(user).addProposal(user.address, "Test Proposal", "0x")
            ).to.be.revertedWith(/AccessControl/);
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
            const depositAmount = ethers.utils.parseEther("100");

            await depositToken.connect(deployer).approve(daoContract.address, depositAmount);

            await expect(daoContract.connect(deployer).deposit(depositAmount))
                .to.emit(daoContract, "DepositMade")
                .withArgs(deployer.address, depositAmount);

            const depositInfo = await daoContract.deposits(deployer.address);
            expect(depositInfo.amount).to.equal(depositAmount);
            expect(depositInfo.timestamp).to.be.gt(0);

            const contractBalance = await depositToken.balanceOf(daoContract.address);
            expect(contractBalance).to.equal(depositAmount);
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
        it("Should revert if user has insufficient votes", async () => {
            const { daoContract, user } = await deployContractFixture();

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

        it("Should execute the proposal if the quorum requirement is met", async () => {
            const { daoContract, deployer, depositToken } = await deployContractFixture();
            const proposalId = 0;

            await daoContract
                .connect(deployer)
                .addProposal(ethers.constants.AddressZero, "Test Proposal", "0x");

            const depositAmount = ethers.utils.parseEther("100");
            await depositToken.connect(deployer).approve(daoContract.address, depositAmount);

            await daoContract.connect(deployer).deposit(depositAmount);

            await daoContract.connect(deployer).vote(proposalId, false);

            await ethers.provider.send("evm_increaseTime", [proposalEndTime]);

            const tx = await daoContract.connect(deployer).finishProposal(proposalId);

            const proposal = await daoContract.proposals(proposalId);
            expect(proposal.executed).to.be.true;

            await expect(tx).to.not.emit(daoContract, "ProposalSucceeded");
            await expect(tx).to.emit(daoContract, "ProposalExecuted");
        });

        // it("Should revert if the call to the proposal function fails", async () => {
        //     const { daoContract, deployer, depositToken } = await deployContractFixture();
        //     const proposalId = 0;

        //     await daoContract
        //         .connect(deployer)
        //         .addProposal(ethers.constants.AddressZero, "Test Proposal", "0x");

        //     const depositAmount = ethers.utils.parseEther("100");
        //     await depositToken.connect(deployer).approve(daoContract.address, depositAmount);

        //     await daoContract.connect(deployer).deposit(depositAmount);

        //     await daoContract.connect(deployer).vote(proposalId, true);

        //     await ethers.provider.send("evm_increaseTime", [proposalEndTime]);

        //     await expect(
        //         daoContract.connect(deployer).finishProposal(proposalId)
        //     ).to.be.revertedWithCustomError(daoContract, "CallToProposalFailed");
        // });

        it("Should revert if the call to the proposal function success", async () => {
            const { daoContract, deployer, depositToken } = await deployContractFixture();
            const proposalId = 0;

            await daoContract
                .connect(deployer)
                .addProposal(ethers.constants.AddressZero, "Test Proposal", "0x");

            const depositAmount = ethers.utils.parseEther("100");
            await depositToken.connect(deployer).approve(daoContract.address, depositAmount);

            await daoContract.connect(deployer).deposit(depositAmount);

            await daoContract.connect(deployer).vote(proposalId, true);

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
            await expect(daoContract.connect(user).setMinimalQuorum(50)).to.be.revertedWith(
                /AccessControl/
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
            const { daoContract, deployer } = await deployContractFixture();
            await daoContract.connect(deployer).setMinimalQuorum(50);
            expect(await daoContract.quorumPercentage()).to.equal(50);
        });
    });

    describe("setDebatingPeriod", () => {
        it("Should revert if called by non-admin", async () => {
            const { daoContract, user } = await deployContractFixture();
            await expect(daoContract.connect(user).setDebatingPeriod(7)).to.be.revertedWith(
                /AccessControl/
            );
        });

        it("Should set new debating period", async () => {
            const { daoContract, deployer } = await deployContractFixture();
            await daoContract.connect(deployer).setDebatingPeriod(7);
            expect(await daoContract.debatingPeriod()).to.equal(7);
        });
    });
});
