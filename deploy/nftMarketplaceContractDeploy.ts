import { DeployFunction } from "hardhat-deploy/types";
import { getNamedAccounts, deployments } from "hardhat";
import { verify } from "../scripts/helpers/verify";

const deployNFTMarketplace: DeployFunction = async () => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    log(`NFTMarketplace is deploying...`);
    const NFTMarketplaceContract = await deploy(`NFTMarketplace`, {
        from: deployer,
        log: true,
        waitConfirmations: 6,
    });

    log(`MyERC721Contract Deployed! at ${NFTMarketplaceContract.address}`);

    await verify(NFTMarketplaceContract.address, []);
};

export default deployNFTMarketplace;
deployNFTMarketplace.tags = [`all`, `NFTMarketplace`];
