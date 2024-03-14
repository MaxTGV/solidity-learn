import { DeployFunction } from "hardhat-deploy/types";
import { getNamedAccounts, deployments } from "hardhat";
import { verify } from "../scripts/helpers/verify";

const deployERC1155: DeployFunction = async () => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    log(`ERC1155 is deploying...`);
    const MyERC1155Contract = await deploy(`MyERC1155`, {
        from: deployer,
        log: true,
        waitConfirmations: 6,
    });

    log(`MyERC1155Contract Deployed! at ${MyERC1155Contract.address}`);

    await verify(MyERC1155Contract.address, []);
};

export default deployERC1155;
deployERC1155.tags = [`all`, `ERC1155`];
