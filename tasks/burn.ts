import { task } from "hardhat/config"

// Task for burning tokens
task("burnTokens", "Burn tokens")
    .addParam("owner", "Owner address")
    .addParam("account", "Account address to burn tokens from")
    .addParam("amount", "Amount of tokens to burn")
    .setAction(async (taskArgs, { ethers }) => {
        const erc20Contract = await ethers.getContractAt("ERC20", taskArgs.owner)

        const tx = await erc20Contract.burn(taskArgs.account, taskArgs.amount)
        await tx.wait()

        console.log(`Burned ${taskArgs.amount} tokens from ${taskArgs.account}`)
    })
