import { ethers } from "hardhat";
import { expect } from "chai";

describe("ERC721 unit tests", () => {
    const deployContractFixture = async () => {
        const [deployer, owner, user] = await ethers.getSigners();

        const ERC721ContractFactory = await ethers.getContractFactory("MyERC721");
        const erc721Contract = await ERC721ContractFactory.connect(deployer).deploy(
            "Zummba",
            "ZMM"
        );

        return { owner, user, deployer, erc721Contract };
    };

    describe("balanceOf", () => {
        it("should return the balance of the given owner", async () => {
            const { erc721Contract, deployer } = await deployContractFixture();
            expect(await erc721Contract.balanceOf(deployer.address)).to.equal(0);
        });
    });

    describe("ownerOf", () => {
        it("should revert if token ID does not exist", async () => {
            const { erc721Contract } = await deployContractFixture();
            await expect(erc721Contract.ownerOf(1)).to.be.revertedWithCustomError(
                erc721Contract,
                "OwnerNotFoundError"
            );
        });

        it("should return the owner of the given token ID", async () => {
            const { erc721Contract, deployer } = await deployContractFixture();
            await erc721Contract.mint(deployer.address, 1);
            expect(await erc721Contract.ownerOf(1)).to.equal(deployer.address);
        });
    });

    describe("name", () => {
        it("should return the name of the token", async () => {
            const { erc721Contract } = await deployContractFixture();
            expect(await erc721Contract.name()).to.equal("Zummba");
        });
    });

    describe("symbol", () => {
        it("should return the symbol of the token", async () => {
            const { erc721Contract } = await deployContractFixture();
            expect(await erc721Contract.symbol()).to.equal("ZMM");
        });
    });

    describe("tokenURI", () => {
        it("should revert if token ID does not exist", async () => {
            const { erc721Contract } = await deployContractFixture();
            await expect(erc721Contract.tokenURI(1)).to.be.revertedWithCustomError(
                erc721Contract,
                "TokenURINotFoundError"
            );
        });

        it("should return the URI for the given token ID", async () => {
            const { erc721Contract, deployer } = await deployContractFixture();
            await erc721Contract.connect(deployer).mint(deployer.address, 1);
            expect(await erc721Contract.tokenURI(1)).to.equal("https://myapi.com/token/1");
        });
    });

    describe("approve", () => {
        it("should revert if not the token owner", async () => {
            const { erc721Contract, owner, user, deployer } = await deployContractFixture();
            await erc721Contract.connect(deployer).mint(deployer.address, 1);
            await expect(
                erc721Contract.connect(owner).approve(user.address, 1)
            ).to.be.revertedWithCustomError(erc721Contract, "NotTokenOwner");
        });

        it("should approve the specified address to spend the specified token ID", async () => {
            const { erc721Contract, deployer, user } = await deployContractFixture();
            await erc721Contract.mint(deployer.address, 1);
            await erc721Contract.approve(user.address, 1);
            expect(await erc721Contract.getApproved(1)).to.equal(user.address);
        });
    });

    describe("getApproved", () => {
        it("should revert if token ID does not exist", async () => {
            const { erc721Contract, deployer } = await deployContractFixture();
            await expect(
                erc721Contract.connect(deployer).getApproved(1)
            ).to.be.revertedWithCustomError(erc721Contract, "TokenOwnerNotFound");
        });

        it("should revert if token ID does not approved", async () => {
            const { erc721Contract, deployer } = await deployContractFixture();
            await erc721Contract.mint(deployer.address, 1);
            await expect(
                erc721Contract.connect(deployer).getApproved(1)
            ).to.be.revertedWithCustomError(erc721Contract, "TokenNotApprovedForTransfer");
        });

        it("should return the approved address for the specified token ID", async () => {
            const { erc721Contract, deployer, user } = await deployContractFixture();
            await erc721Contract.mint(deployer.address, 1);
            await erc721Contract.approve(user.address, 1);
            expect(await erc721Contract.getApproved(1)).to.equal(user.address);
        });
    });

    describe("setApprovalForAll", () => {
        it("should revert if setting approval status for self", async () => {
            const { erc721Contract, deployer } = await deployContractFixture();
            await expect(
                erc721Contract.setApprovalForAll(deployer.address, true)
            ).to.be.revertedWithCustomError(erc721Contract, "SettingApprovalStatusFroSelf");
        });

        it("should set approval status for the specified operator", async () => {
            const { erc721Contract, deployer, user } = await deployContractFixture();
            await erc721Contract.setApprovalForAll(user.address, true);
            expect(await erc721Contract.isApprovedForAll(deployer.address, user.address)).to.equal(
                true
            );
        });
    });

    describe("isApprovedForAll", () => {
        it("should return the approval status for the specified owner and operator", async () => {
            const { erc721Contract, deployer, user } = await deployContractFixture();
            await erc721Contract.setApprovalForAll(user.address, true);
            expect(await erc721Contract.isApprovedForAll(deployer.address, user.address)).to.equal(
                true
            );
        });
    });

    describe("transferFrom", () => {
        it("should revert if caller is not authorized to transfer", async () => {
            const { erc721Contract, deployer, owner, user } = await deployContractFixture();
            await erc721Contract.mint(deployer.address, 1);
            await erc721Contract.mint(owner.address, 2);
            await erc721Contract.connect(owner).approve(user.address, 2);
            await expect(
                erc721Contract.transferFrom(deployer.address, user.address, 2)
            ).to.be.revertedWithCustomError(erc721Contract, "TransferCallerNotAuthorized");
        });

        it("should revert if caller is transfer to zero address", async () => {
            const { erc721Contract, deployer, owner, user } = await deployContractFixture();
            await erc721Contract.mint(deployer.address, 1);
            await erc721Contract.mint(owner.address, 2);
            await erc721Contract.connect(owner).approve(user.address, 2);
            await expect(
                erc721Contract.transferFrom(deployer.address, ethers.constants.AddressZero, 1)
            ).to.be.revertedWithCustomError(erc721Contract, "TransferToZeroAddress");
        });

        it("should transfer token from one address to another", async () => {
            const { erc721Contract, deployer, user } = await deployContractFixture();
            await erc721Contract.mint(deployer.address, 1);
            await erc721Contract.transferFrom(deployer.address, user.address, 1);
            expect(await erc721Contract.ownerOf(1)).to.equal(user.address);
        });
    });

    // describe("safeTransferFrom", () => {
    //     it("should revert if caller is not authorized to transfer", async () => {
    //         const { erc721Contract, deployer, owner, user } = await deployContractFixture();
    //         await erc721Contract.mint(deployer.address, 1);
    //         await erc721Contract.mint(owner.address, 2);
    //         await erc721Contract.approve(user.address, 2);
    //         await expect(
    //             erc721Contract.safeTransferFrom(owner.address, user.address, 1)
    //         ).to.be.revertedWithCustomError(erc721Contract, "TransferCallerNotAuthorized");
    //     });

    //     it("should transfer token from one address to another", async () => {
    //         const { erc721Contract, deployer, user } = await deployContractFixture();
    //         await erc721Contract.mint(deployer.address, 1);
    //         await erc721Contract.safeTransferFrom(deployer.address, user.address, 1);
    //         expect(await erc721Contract.ownerOf(1)).to.equal(user.address);
    //     });
    // });

    describe("burn", () => {
        it("should revert if caller is not the token owner", async () => {
            const { erc721Contract, deployer, user } = await deployContractFixture();
            await erc721Contract.mint(deployer.address, 1);
            await expect(erc721Contract.connect(user).burn(1)).to.be.revertedWithCustomError(
                erc721Contract,
                "BurnOfNonOwnedToken"
            );
        });

        it("should burn the specified token", async () => {
            const { erc721Contract, deployer } = await deployContractFixture();
            await erc721Contract.mint(deployer.address, 1);
            await erc721Contract.burn(1);
            expect(await erc721Contract.balanceOf(deployer.address)).to.equal(0);
        });
    });

    describe("mint", () => {
        it("should revert if token ID already exists", async () => {
            const { erc721Contract, deployer, user } = await deployContractFixture();
            await erc721Contract.mint(deployer.address, 1);
            await expect(erc721Contract.mint(user.address, 1)).to.be.revertedWithCustomError(
                erc721Contract,
                "TokenAlreadyMinted"
            );
        });

        it("should mint a new token and assign it to the specified address", async () => {
            const { erc721Contract, deployer, user } = await deployContractFixture();
            await erc721Contract.mint(deployer.address, 1);
            expect(await erc721Contract.ownerOf(1)).to.equal(deployer.address);
        });
    });
});
