import { ethers } from "hardhat";
import { expect } from "chai";

describe("NFT marketplace unit tests", () => {
    const deployContractFixture = async () => {
        const [deployer, owner, user] = await ethers.getSigners();

        const NFTMarketplaceContractFactory = await ethers.getContractFactory("NFTMarketplace");

        const ERC721ContractFactory = await ethers.getContractFactory("MyERC721");
        const erc721Contract = await ERC721ContractFactory.connect(deployer).deploy(
            "Zummba",
            "ZMM"
        );

        const erc20ContractFactory = await ethers.getContractFactory("ERC20");
        const tokenByERC20 = await erc20ContractFactory
            .connect(deployer)
            .deploy("Burlan", "BRL", 18, 1000, user.address);

        const nfrMarketplaceContract = await NFTMarketplaceContractFactory.connect(
            deployer
        ).deploy();

        return { owner, user, deployer, nfrMarketplaceContract, erc721Contract, tokenByERC20 };
    };

    describe("createItem", () => {
        it("Should create a new NFT", async () => {
            const { nfrMarketplaceContract } = await deployContractFixture();
            const tokenUri = "https://example.com/token/1";
            await expect(nfrMarketplaceContract.createItem(tokenUri))
                .to.emit(nfrMarketplaceContract, "TokenCreated")
                .withArgs(1, tokenUri);
        });

        it("Should revert if called by non-artist", async () => {
            const { nfrMarketplaceContract, user } = await deployContractFixture();
            await expect(
                nfrMarketplaceContract.connect(user).createItem("https://example.com/token/1")
            ).to.be.revertedWithCustomError(nfrMarketplaceContract, "OnlyArtist");
        });
    });

    describe("listItem", () => {
        it("Should list an NFT for sale", async () => {
            const { nfrMarketplaceContract, erc721Contract } = await deployContractFixture();
            const tokenUri = "https://example.com/token/1";
            await nfrMarketplaceContract.createItem(tokenUri);
            const price = ethers.utils.parseEther("1");

            await expect(nfrMarketplaceContract.listItem(1, price, erc721Contract.address))
                .to.emit(nfrMarketplaceContract, "TokenListed")
                .withArgs(1, price, erc721Contract.address);
        });

        it("Should revert if called by non-owner", async () => {
            const { nfrMarketplaceContract, erc721Contract, user } = await deployContractFixture();
            const tokenUri = "https://example.com/token/1";
            await nfrMarketplaceContract.createItem(tokenUri);
            const price = ethers.utils.parseEther("1");

            await expect(
                nfrMarketplaceContract.connect(user).listItem(1, price, erc721Contract.address)
            ).to.be.revertedWithCustomError(nfrMarketplaceContract, "NotTokenOwner");
        });

        it("Should revert if price is zero", async () => {
            const { nfrMarketplaceContract } = await deployContractFixture();
            const tokenUri = "https://example.com/token/1";
            await nfrMarketplaceContract.createItem(tokenUri);
            const tokenAddress = ethers.constants.AddressZero;

            await expect(
                nfrMarketplaceContract.listItem(1, 0, tokenAddress)
            ).to.be.revertedWithCustomError(nfrMarketplaceContract, "ZeroPrice");
        });

        // it("Should revert if token address is zero", async () => {
        //     const { nfrMarketplaceContract } = await deployContractFixture();
        //     const tokenUri = "https://example.com/token/1";
        //     await nfrMarketplaceContract.createItem(tokenUri);
        //     const price = ethers.utils.parseEther("1");

        //     await expect(
        //         nfrMarketplaceContract.listItem(1, price, ethers.constants.AddressZero)
        //     ).to.be.revertedWithCustomError(nfrMarketplaceContract, "ZeroTokenAddress");
        // });
    });

    describe("buyItem", () => {
        it("Should revert if token is not for sale", async () => {
            const { nfrMarketplaceContract, user } = await deployContractFixture();

            const tokenUri = "https://example.com/token/1";
            await nfrMarketplaceContract.createItem(tokenUri);

            await expect(
                nfrMarketplaceContract.connect(user).buyItem(1)
            ).to.be.revertedWithCustomError(nfrMarketplaceContract, "TokenNotForSale");
        });

        it("Should revert if not enough ETH sent for purchase", async () => {
            const { nfrMarketplaceContract, user } = await deployContractFixture();

            const tokenUri = "https://example.com/token/1";
            await nfrMarketplaceContract.createItem(tokenUri);
            const price = ethers.utils.parseEther("1");
            const tokenAddress = ethers.constants.AddressZero;
            await nfrMarketplaceContract.listItem(1, price, tokenAddress);

            await expect(
                nfrMarketplaceContract.connect(user).buyItem(1)
            ).to.be.revertedWithCustomError(nfrMarketplaceContract, "InsufficientEtherSent");
        });

        it("Should revert if not enough allowance", async () => {
            const { nfrMarketplaceContract, tokenByERC20, deployer, user } =
                await deployContractFixture();

            const tokenUri = "https://example.com/token/1";
            await nfrMarketplaceContract.connect(deployer).createItem(tokenUri);
            const price = 1000;

            await tokenByERC20.connect(user).approve(nfrMarketplaceContract.address, price - 1);
            await nfrMarketplaceContract.connect(deployer).setApprovalForAll(user.address, true);

            await nfrMarketplaceContract.connect(deployer).listItem(1, price, tokenByERC20.address);

            await expect(
                nfrMarketplaceContract.connect(user).buyItem(1)
            ).to.be.revertedWithCustomError(nfrMarketplaceContract, "InsufficientAllowance");
        });

        it("Should revert if insufficient ether", async () => {
            const { nfrMarketplaceContract, tokenByERC20, deployer, user } =
                await deployContractFixture();

            const tokenUri = "https://example.com/token/1";
            await nfrMarketplaceContract.createItem(tokenUri);
            const price = 1000;
            const tokenAddress = ethers.constants.AddressZero;

            await nfrMarketplaceContract.connect(deployer).listItem(1, price, tokenAddress);

            await tokenByERC20.connect(user).approve(nfrMarketplaceContract.address, price);
            await nfrMarketplaceContract.connect(deployer).setApprovalForAll(user.address, true);
            await tokenByERC20.connect(user).transfer(nfrMarketplaceContract.address, price);

            await expect(
                nfrMarketplaceContract.connect(user).buyItem(1)
            ).to.be.revertedWithCustomError(nfrMarketplaceContract, "InsufficientEtherSent");
        });

        it("Should allow a buyer to purchase an NFT with ETH", async () => {
            const { nfrMarketplaceContract, erc721Contract, tokenByERC20, deployer, user } =
                await deployContractFixture();

            const tokenUri = "https://example.com/token/1";
            await nfrMarketplaceContract.createItem(tokenUri);
            const price = 1000;
            const tokenAddress = ethers.constants.AddressZero;

            await nfrMarketplaceContract.connect(deployer).listItem(1, price, tokenAddress);
            await nfrMarketplaceContract.connect(deployer).setApprovalForAll(user.address, true);

            await nfrMarketplaceContract
                .connect(user)
                .deposit({ value: ethers.utils.parseEther("1") });

            await nfrMarketplaceContract.connect(user).buyItem(1);

            expect(await nfrMarketplaceContract.ownerOf(1)).to.equal(user.address);
        });

        it("Should allow a buyer to purchase an NFT with ERC20 token", async () => {
            const { nfrMarketplaceContract, tokenByERC20, deployer, user } =
                await deployContractFixture();

            const tokenUri = "https://example.com/token/1";
            await nfrMarketplaceContract.connect(deployer).createItem(tokenUri);
            const price = 1000;

            await tokenByERC20.connect(user).approve(nfrMarketplaceContract.address, price);
            await nfrMarketplaceContract.connect(deployer).setApprovalForAll(user.address, true);

            await nfrMarketplaceContract.connect(deployer).listItem(1, price, tokenByERC20.address);

            const tx = await nfrMarketplaceContract.connect(user).buyItem(1);
            await tx.wait();

            expect(await nfrMarketplaceContract.ownerOf(1)).to.equal(user.address);
            expect(await tokenByERC20.balanceOf(user.address)).to.equal(0);
        });

        // it("Should revert if ERC20 transfer fails", async () => {
        //     const { nfrMarketplaceContract, tokenByERC20, deployer, user } =
        //         await deployContractFixture();

        //     const tokenUri = "https://example.com/token/1";
        //     await nfrMarketplaceContract.connect(deployer).createItem(tokenUri);
        //     const price = 1000;

        //     await tokenByERC20.connect(user).approve(nfrMarketplaceContract.address, price);
        //     await nfrMarketplaceContract.connect(deployer).setApprovalForAll(user.address, true);

        //     await nfrMarketplaceContract.connect(deployer).listItem(1, price, "1x1111");

        //     await expect(
        //         nfrMarketplaceContract.connect(user).buyItem(1)
        //     ).to.be.revertedWithCustomError(nfrMarketplaceContract, "TransferFailed");
        // });
    });

    describe("cancel", () => {
        it("Should allow token owner to cancel listing", async () => {
            const { nfrMarketplaceContract, deployer } = await deployContractFixture();

            const tokenUri = "https://example.com/token/1";
            await nfrMarketplaceContract.connect(deployer).createItem(tokenUri);
            const price = ethers.utils.parseEther("1");

            await nfrMarketplaceContract
                .connect(deployer)
                .listItem(1, price, ethers.constants.AddressZero);

            await expect(nfrMarketplaceContract.connect(deployer).cancel(1))
                .to.emit(nfrMarketplaceContract, "TokenOfferCancelled")
                .withArgs(1);
        });

        it("Should revert if called by non-token owner", async () => {
            const { nfrMarketplaceContract, deployer, user } = await deployContractFixture();

            const tokenUri = "https://example.com/token/1";
            await nfrMarketplaceContract.connect(deployer).createItem(tokenUri);
            const price = ethers.utils.parseEther("1");
            await nfrMarketplaceContract
                .connect(deployer)
                .listItem(1, price, ethers.constants.AddressZero);

            await expect(
                nfrMarketplaceContract.connect(user).cancel(1)
            ).to.be.revertedWithCustomError(nfrMarketplaceContract, "NotTokenOwner");
        });
    });

    describe("supportsInterface", () => {
        it("supports IERC721 interface", async function () {
            const { nfrMarketplaceContract } = await deployContractFixture();

            const interfaceId1 = "0x80ac58cd";
            expect(await nfrMarketplaceContract.supportsInterface(interfaceId1)).to.equal(true);
        });

        it("supports IERC721MetadataURI interface", async function () {
            const { nfrMarketplaceContract } = await deployContractFixture();

            const interfaceId1 = "0x5b5e139f";
            expect(await nfrMarketplaceContract.supportsInterface(interfaceId1)).to.equal(true);
        });

        it("supports unknown interface", async function () {
            const { nfrMarketplaceContract } = await deployContractFixture();

            const interfaceId1 = "0x12345678";
            expect(await nfrMarketplaceContract.supportsInterface(interfaceId1)).to.equal(false);
        });
    });
});
