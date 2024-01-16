import { task } from "hardhat/config"

// Task for minting new tokens
task("mintTokens", "Mint new tokens")
    .addParam("owner", "Owner address")
    .addParam("account", "Account address to receive the minted tokens")
    .addParam("amount", "Amount of tokens to mint")
    .setAction(async (taskArgs, { ethers }) => {
        const erc20Contract = await ethers.getContractAt("ERC20", taskArgs.owner)

        const tx = await erc20Contract.mint(taskArgs.account, taskArgs.amount)
        await tx.wait()

        console.log(`Minted ${taskArgs.amount} tokens to ${taskArgs.account}`)
    })
