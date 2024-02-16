import { DeployFunction } from "hardhat-deploy/types";
import { getNamedAccounts, deployments } from "hardhat";
import { verify } from "../scripts/helpers/verify";

const deployVesting: DeployFunction = async () => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const args = ["0xDfefcfF5b3a7AcF52908f00eb6f3FaC7C89aB8BF"];

    log(`Vesting is deploying...`);
    const VestingContract = await deploy(`Vesting`, {
        from: deployer,
        log: true,
        waitConfirmations: 6,
        args,
    });

    log(`VestingContract Deployed! at ${VestingContract.address}`);

    await verify(VestingContract.address, args);
};

export default deployVesting;
deployVesting.tags = [`all`, `Vesting`];
