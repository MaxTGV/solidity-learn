import { DeployFunction } from "hardhat-deploy/types";
import { getNamedAccounts, deployments } from "hardhat";
import { verify } from "../scripts/helpers/verify";

const deployDAO: DeployFunction = async () => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const args = ["0xDfefcfF5b3a7AcF52908f00eb6f3FaC7C89aB8BF"];

    log(`DAO is deploying...`);
    const DAOContract = await deploy(`DAO`, {
        from: deployer,
        log: true,
        waitConfirmations: 6,
        args,
    });

    log(`DAOContract Deployed! at ${DAOContract.address}`);

    await verify(DAOContract.address, args);
};

export default deployDAO;
deployDAO.tags = [`all`, `DAO`];
