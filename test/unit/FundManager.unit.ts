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

        const FundManagerFactory = await ethers.getContractFactory("FundManager")
        const fundManager: FundManager = await FundManagerFactory.connect(deployer).deploy()

        const FoundationFactory = await ethers.getContractFactory("Foundation")
        const foundation: Foundation = await FoundationFactory.connect(deployer).deploy(
            user.getAddress(),
            "Test Foundation"
        )

        return { deployer, user, fundManager, foundation }
    }

    it("Should create a new foundation", async () => {
        const { deployer, fundManager, foundation } = await loadFixture(deployContractFixture)

        const initialNumberOfFoundations = await fundManager.numberOfFoundationsCreated()

        await fundManager.createFoundation(foundation.address, "Test Foundation")

        const finalNumberOfFoundations = await fundManager.numberOfFoundationsCreated()

        expect(finalNumberOfFoundations.sub(initialNumberOfFoundations)).to.equal(1)

        const eventFilter = fundManager.filters.FoundationCreated(null, null, null, null)
        const events = await fundManager.queryFilter(eventFilter)

        expect(events).to.have.lengthOf(1)
        expect(events[0].args.owner).to.equal(await deployer.getAddress())
    })

    describe("Transfer funds to receiver", () => {
        it("Should transfer funds to the specified address", async () => {
            const { deployer, user, fundManager, foundation } = await loadFixture(
                deployContractFixture
            )

            await foundation.connect(user).donate({ value: ethers.utils.parseEther("1") })

            const initialBalance = await ethers.provider.getBalance(user.getAddress())

            const initialFoundationBalance = await ethers.provider.getBalance(foundation.address)

            const initialFundManagerBalance = await ethers.provider.getBalance(fundManager.address)

            // Передаем средства фонду
            // TODO: Здесь происходит выброс ошибки!
            const transferAmount = ethers.utils.parseEther("0.5")
            const transferTx = fundManager
                .connect(user)
                .transferFundsToReceiver(foundation.address, transferAmount)

            // Ожидаем событие
            await expect(transferTx).to.emit(fundManager, "FundsTransferred")

            // Получаем баланс после передачи средств
            const finalBalance = await ethers.provider.getBalance(user.getAddress())

            // Получаем баланс фонда после передачи средств
            const finalFoundationBalance = await ethers.provider.getBalance(foundation.address)

            // Получаем текущий баланс контракта FundManager
            const finalFundManagerBalance = await ethers.provider.getBalance(fundManager.address)

            // Проверяем, что баланс увеличился на 0.5 ETH
            const expectedBalance = initialBalance.add(transferAmount)
            expect(finalBalance).to.equal(expectedBalance)

            // Проверяем, что баланс фонда увеличился на 0.5 ETH
            const expectedFoundationBalance = initialFoundationBalance.add(transferAmount)
            expect(finalFoundationBalance).to.equal(expectedFoundationBalance)

            // Проверяем, что баланс контракта FundManager уменьшился на 0.5 ETH
            const expectedFundManagerBalance = initialFundManagerBalance.sub(transferAmount)
            expect(finalFundManagerBalance).to.equal(expectedFundManagerBalance)
        })

        it("Should revert on unauthorized transfer", async () => {
            const { deployer, fundManager, foundation } = await loadFixture(deployContractFixture)

            await expect(
                fundManager
                    .connect(deployer)
                    .transferFundsToReceiver(foundation.address, ethers.utils.parseEther("0.5"))
            ).to.be.reverted
        })

        it("Should revert on insufficient funds", async () => {
            const { user, fundManager, foundation } = await loadFixture(deployContractFixture)

            await foundation.connect(user).donate({ value: ethers.utils.parseEther("0.1") })

            await expect(
                fundManager
                    .connect(user)
                    .transferFundsToReceiver(foundation.address, ethers.utils.parseEther("1"))
            ).to.be.reverted
        })
    })
})
