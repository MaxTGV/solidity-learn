import { DeployFunction } from "hardhat-deploy/types";
import { getNamedAccounts, deployments } from "hardhat";
import { verify } from "../scripts/helpers/verify";

const deployERC721: DeployFunction = async () => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    log(`ERC721 is deploying...`);
    const MyERC721Contract = await deploy(`MyERC721`, {
        from: deployer,
        log: true,
        waitConfirmations: 6,
    });

    log(`MyERC721Contract Deployed! at ${MyERC721Contract.address}`);

    await verify(MyERC721Contract.address, []);
};

export default deployERC721;
deployERC721.tags = [`all`, `ERC721`];
