import { ethers } from "hardhat"
import { expect } from "chai"
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers"

const DONATION = 100
const SEND_VALUE = 50

describe("CharityContract unit tests", () => {
    const deployContractFixture = async () => {
        const signers = await ethers.getSigners()
        const deployer = signers[0]
        const user = signers[1]

        const simpleContractFactory = await ethers.getContractFactory("CharityContract")
        const simpleContract = await simpleContractFactory.connect(deployer).deploy()

        return { deployer, user, simpleContract }
    }

    describe("Contract init", () => {
        it("Should initialize with the correct owner", async () => {
            const { deployer, simpleContract } = await loadFixture(deployContractFixture)
            expect(await simpleContract.owner()).to.equal(deployer.address)
        })

        it("Should initialize with an empty list of donators", async () => {
            const { simpleContract } = await loadFixture(deployContractFixture)
            const donators = await simpleContract.getDonators()
            expect(donators.length).to.equal(0)
        })

        it("Should initialize with total donations of 0", async () => {
            const { simpleContract } = await loadFixture(deployContractFixture)
            const totalDonations = await simpleContract.getSumOfDonations()
            expect(totalDonations).to.equal(0)
        })
    })

    describe("Donate", () => {
        it("Should revert on zero donation", async () => {
            const { user, simpleContract } = await loadFixture(deployContractFixture)

            await expect(
                simpleContract.connect(user).donate({ value: 0 })
            ).to.be.revertedWithCustomError(simpleContract, "InvalidDonation")
        })

        it("Should increase the total donations and add the user to the donators list", async () => {
            const { user, simpleContract } = await loadFixture(deployContractFixture)

            await simpleContract.connect(user).donate({ value: DONATION })

            const totalDonations = await simpleContract.getSumOfDonations()
            expect(totalDonations).to.equal(DONATION)

            const donators = await simpleContract.getDonators()
            expect(donators.length).to.equal(1)
            expect(donators[0]).to.equal(user.address)
        })

        it("Should receive donation and emit event", async () => {
            const { user, simpleContract } = await loadFixture(deployContractFixture)

            expect(await simpleContract.connect(user).donate({ value: DONATION }))
                .to.emit(simpleContract, "DonationReceived")
                .withArgs(user.address, DONATION)
        })

        it("Should receive donation", async () => {
            const { user, simpleContract } = await loadFixture(deployContractFixture)

            const receiveTx = await user.sendTransaction({
                to: simpleContract.address,
                value: ethers.utils.parseEther("1"),
            })

            expect(receiveTx)
                .to.emit(simpleContract, "DonationReceived")
                .withArgs(user.address, DONATION)
        })

        it("Should accumulate donations if the same user donates again", async () => {
            const { user, simpleContract } = await loadFixture(deployContractFixture)

            await simpleContract.connect(user).donate({ value: DONATION })
            await simpleContract.connect(user).donate({ value: DONATION })

            const totalDonations = await simpleContract.getSumOfDonations()
            expect(totalDonations).to.equal(DONATION * 2)

            const donators = await simpleContract.getDonators()
            expect(donators.length).to.equal(1)
            expect(donators[0]).to.equal(user.address)
        })
    })

    describe("Send Help", () => {
        it("Should revert if called by a non-owner", async () => {
            const { user, simpleContract } = await loadFixture(deployContractFixture)
            await expect(simpleContract.connect(user).sendHelp(user.address, SEND_VALUE)).to.be
                .revertedWithCustomError(simpleContract, "Unauthorized")
        })

        it("Should revert if the contract balance is insufficient", async () => {
            const { deployer, simpleContract } = await loadFixture(deployContractFixture)
            const user = ethers.Wallet.createRandom()
            await simpleContract.connect(deployer).donate({ value: DONATION })
            await expect(simpleContract.connect(deployer).sendHelp(user.address, SEND_VALUE * 3)).to
                .be.revertedWithCustomError(simpleContract, "InsufficientFunds")
        })

        it("Should transfer funds to the specified address", async () => {
            const { deployer, user, simpleContract } = await loadFixture(deployContractFixture)

            const initialUserBalance = await ethers.provider.getBalance(user.address)

            await simpleContract.connect(deployer).donate({ value: DONATION })
            await simpleContract.connect(deployer).sendHelp(user.address, SEND_VALUE)

            const finalUserBalance = await ethers.provider.getBalance(user.address)

            const actualBalanceChange = finalUserBalance.sub(initialUserBalance)

            expect(actualBalanceChange).to.be.equal(SEND_VALUE, "Balance change mismatch")
        })
    })
})
