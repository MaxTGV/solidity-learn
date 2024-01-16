import { DeployFunction } from "hardhat-deploy/types"
import { getNamedAccounts, deployments } from "hardhat"
import { verify } from "../scripts/helpers/verify"

const deployERC20: DeployFunction = async () => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const args = ["Burlan", "BRL", 18, 1000000, deployer]

    log(`ERC20 is deploying...`)
    const ERC20Contract = await deploy(`ERC20`, {
        from: deployer,
        log: true,
        waitConfirmations: 6,
        args,
    })

    log(`ERC20Contract Deployed! at ${ERC20Contract.address}`)

    await verify(ERC20Contract.address, args)
}

export default deployERC20
deployERC20.tags = [`all`, `erc20`]
