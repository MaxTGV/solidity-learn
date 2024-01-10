/* eslint-disable no-process-exit */
// yarn hardhat node
// yarn hardhat run scripts/deploy.ts --network localhost
// You need to create file .env-#{network-name} to store info about deploy.

import hre from "hardhat"
import { verify } from "./helpers/verify"

async function deploy() {
    const [deployer] = await hre.ethers.getSigners()

    console.log("Deploying contracts with the account:", deployer.address)

    const CharityContractFactory = await hre.ethers.getContractFactory("CharityContract")
    const CharityContract = await CharityContractFactory.deploy()

    console.log("Contract address:", CharityContract.address)

    await verify(CharityContract.address, [])
}

deploy()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
