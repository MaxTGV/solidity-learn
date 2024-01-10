import { task } from "hardhat/config"

task("donate", "Make a donation")
    .addParam("value", "Amount to donate in ether")
    .setAction(async (taskArgs, { ethers }) => {
        const [signer] = await ethers.getSigners()
        const charityContract = await ethers.getContractAt("CharityContract", signer.address)

        const tx = await charityContract.donate({ value: ethers.utils.parseEther(taskArgs.value) })
        await tx.wait()

        console.log("Donation completed!")
    })
