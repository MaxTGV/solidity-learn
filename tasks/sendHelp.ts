import { task } from "hardhat/config"

task("sendHelp", "Send help to an address")
    .addParam("to", "Recipient's address")
    .addParam("address", "address")
    .addParam("amount", "Amount to send in ether")
    .setAction(async (taskArgs, { ethers }) => {
        const [signer] = await ethers.getSigners()
        const charityContract = await ethers.getContractAt("CharityContract", taskArgs.address)

        const tx = await charityContract.sendHelp(
            taskArgs.to,
            ethers.utils.parseEther(taskArgs.amount)
        )
        await tx.wait()

        console.log("Help sent!")
    })
