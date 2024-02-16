import { DeployFunction } from "hardhat-deploy/types";
import { getNamedAccounts, deployments } from "hardhat";
import { verify } from "../scripts/helpers/verify";

const deployStaking: DeployFunction = async () => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const args = [
        "0xDfefcfF5b3a7AcF52908f00eb6f3FaC7C89aB8BF",
        "0x78F7180Fe473768dCa20529A10e90aC01865e169",
        1000000,
        18,
    ];

    log(`Staking is deploying...`);
    const StakingContract = await deploy(`Staking`, {
        from: deployer,
        log: true,
        waitConfirmations: 6,
        args,
    });

    log(`StakingContract Deployed! at ${StakingContract.address}`);

    await verify(StakingContract.address, args);
};

export default deployStaking;
deployStaking.tags = [`all`, `Staking`];
