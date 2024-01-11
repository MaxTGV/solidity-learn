import { DeployFunction } from "hardhat-deploy/types"
import { getNamedAccounts, deployments } from "hardhat"
import { verify } from "../scripts/helpers/verify"

const deployFunction: DeployFunction = async () => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log(`CharityContract is deploying...`)
    const CharityContract = await deploy(`CharityContract`, {
        from: deployer,
        log: true,
        waitConfirmations: 6,
    })

    log(`CharityContract Deployed! at ${CharityContract.address}`)

    await verify(CharityContract.address, [])
}

export default deployFunction
deployFunction.tags = [`all`, `helloWorld`, `main`]
