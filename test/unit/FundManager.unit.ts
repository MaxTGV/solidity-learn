import { expect } from "chai"
import { ethers } from "hardhat"
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers"
import { FundManager, Foundation } from "../../typechain"
import { Signer } from "ethers"

describe("FundManager contract", () => {
    const deployContractFixture = async () => {
        const signers: Signer[] = await ethers.getSigners()
        const deployer: Signer = signers[0]
        const user: Signer = signers[1]
        const user1: Signer = signers[2]

        const FundManagerFactory = await ethers.getContractFactory("FundManager")
        const fundManager: FundManager = await FundManagerFactory.connect(deployer).deploy()

        return { deployer, user, fundManager, user1 }
    }

    it("Should create a new foundation", async () => {
        const { deployer, fundManager, user1 } = await loadFixture(deployContractFixture)

        const initialNumberOfFoundations = await fundManager.numberOfFoundationsCreated()

        await fundManager.createFoundation(user1.getAddress(), "Test Foundation")

        const finalNumberOfFoundations = await fundManager.numberOfFoundationsCreated()

        expect(finalNumberOfFoundations.sub(initialNumberOfFoundations)).to.equal(1)

        const eventFilter = fundManager.filters.FoundationCreated(null, null, null, null)
        const events = await fundManager.queryFilter(eventFilter)

        expect(events).to.have.lengthOf(1)
        expect(events[0].args.owner).to.equal(await deployer.getAddress())
    })

    describe("Transfer funds to receiver", () => {
        it("Should transfer funds to the specified address", async () => {
            const { deployer, user, fundManager, user1 } = await loadFixture(deployContractFixture)

            await fundManager.createFoundation(user1.getAddress(), "Test Foundation")

            const eventFilter = fundManager.filters.FoundationCreated(null, null, null, null)
            const events = await fundManager.queryFilter(eventFilter)

            const foundationAddress = events[0].args.foundationAddress

            const foundation = await ethers.getContractAt("Foundation", foundationAddress)

            await foundation.connect(user).donate({ value: ethers.utils.parseEther("1") })

            const beforeBalance = await ethers.provider.getBalance(user1.getAddress())

            const transferAmount = ethers.utils.parseEther("0.5")
            const transferTx = fundManager
                .connect(deployer)
                .transferFundsToReceiver(foundation.address, transferAmount)

            await expect(transferTx).to.emit(fundManager, "FundsTransferred")

            const finalBalance = await ethers.provider.getBalance(user1.getAddress())

            const expectedBalance = beforeBalance.add(transferAmount)
            expect(finalBalance).to.equal(expectedBalance)
        })

        it("Should revert on unauthorized transfer", async () => {
            const { deployer, fundManager, user } = await loadFixture(deployContractFixture)

            await expect(
                fundManager
                    .connect(deployer)
                    .transferFundsToReceiver(user.getAddress(), ethers.utils.parseEther("0.5"))
            ).to.be.revertedWithCustomError(fundManager, "Unauthorized")
        })

        it("Should revert on insufficient funds", async () => {
            const { user, user1, deployer, fundManager } = await loadFixture(deployContractFixture)

            await fundManager.createFoundation(user.getAddress(), "Test Foundation")

            const eventFilter = fundManager.filters.FoundationCreated(null, null, null, null)
            const events = await fundManager.queryFilter(eventFilter)

            const foundationAddress = events[0].args.foundationAddress

            const foundation = await ethers.getContractAt("Foundation", foundationAddress)

            await foundation.connect(user1).donate({ value: ethers.utils.parseEther("0.1") })

            await expect(
                fundManager
                    .connect(deployer)
                    .transferFundsToReceiver(foundation.address, ethers.utils.parseEther("1"))
            ).to.be.revertedWithCustomError(fundManager, "InsufficientFunds")
        })
    })
})
