import { ethers } from "hardhat"
import { expect } from "chai"
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers"

const DONATION = 100
const SEND_VALUE = 50

describe("Foundation unit tests", () => {
    const deployContractFixture = async () => {
        const signers = await ethers.getSigners()
        const deployer = signers[0]
        const user = signers[1]

        const foundationFactory = await ethers.getContractFactory("Foundation")
        const foundation = await foundationFactory
            .connect(deployer)
            .deploy(user.address, "Foundation Description")
        return { deployer, user, foundation }
    }

    const deployContractFixtureWithValue = async () => {
        const signers = await ethers.getSigners()
        const deployer = signers[0]

        const foundationFactory = await ethers.getContractFactory("Foundation")
        const foundation = await foundationFactory
            .connect(deployer)
            .deploy(deployer.address, "Test Foundation", { value: ethers.utils.parseEther("100") })

        return { deployer, foundation }
    }

    describe("Contract initialization", () => {
        it("Should set the correct owner", async () => {
            const { deployer, foundation } = await loadFixture(deployContractFixture)
            const owner = await foundation.owner()
            expect(owner).to.equal(deployer.address)
        })

        it("Should set the correct donationsReceiver", async () => {
            const { user, foundation } = await loadFixture(deployContractFixture)
            const donationsReceiver = await foundation.donationsReceiver()
            expect(donationsReceiver).to.equal(user.address)
        })

        it("Should set the correct description", async () => {
            const { foundation } = await loadFixture(deployContractFixture)
            const description = await foundation.description()
            expect(description).to.equal("Foundation Description")
        })

        it("Should handle value in constructor", async () => {
            const { foundation } = await loadFixture(deployContractFixture)

            const initialBalance = await ethers.provider.getBalance(foundation.address)

            const { foundation: foundationWithValue } = await loadFixture(
                deployContractFixtureWithValue
            )

            const finalBalance = await ethers.provider.getBalance(foundationWithValue.address)

            expect(finalBalance.sub(initialBalance)).to.equal(ethers.utils.parseEther("100"))
        })
    })

    describe("Donate", () => {
        it("Should revert on zero donation", async () => {
            const { user, foundation } = await loadFixture(deployContractFixture)
            await expect(foundation.connect(user).donate({ value: 0 })).to.be.reverted
        })

        it("Should add donation information", async () => {
            const { deployer, user, foundation } = await loadFixture(deployContractFixture)
            await foundation.connect(deployer).donate({ value: ethers.utils.parseEther("1") })
            const donatorAddresses = await foundation.getDonators()
            expect(donatorAddresses).to.eql([deployer.address])

            const totalDonations = await foundation.getSumOfDonations()
            expect(totalDonations).to.equal(ethers.utils.parseEther("1"))
        })
    })

    describe("Send Funds To Receiver", () => {
        it("Should revert if called by non-owner", async () => {
            const { user, foundation } = await loadFixture(deployContractFixture)
            await expect(
                foundation.connect(user).sendFundsToReceiver(ethers.utils.parseEther("1"))
            ).to.be.revertedWith("Ownable: caller is not the owner")
        })

        it("Should revert if the contract balance is insufficient", async () => {
            const { deployer, user, foundation } = await loadFixture(deployContractFixture)
            await expect(
                foundation.connect(deployer).sendFundsToReceiver(ethers.utils.parseEther("1"))
            ).to.be.reverted
        })

        it("Should transfer funds to the specified address", async () => {
            const { deployer, user, foundation } = await loadFixture(deployContractFixture)

            const initialUserBalance = await ethers.provider.getBalance(user.address)

            await foundation.connect(deployer).donate({ value: DONATION })
            await foundation.connect(deployer).sendFundsToReceiver(SEND_VALUE)

            const finalUserBalance = await ethers.provider.getBalance(user.address)

            const actualBalanceChange = finalUserBalance.sub(initialUserBalance)

            expect(actualBalanceChange).to.be.equal(SEND_VALUE, "Balance change mismatch")
        })
    })
})
