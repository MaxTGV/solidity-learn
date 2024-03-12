import { ethers } from "hardhat";
import { expect } from "chai";

describe("ERC1155 unit tests", () => {
    const deployContractFixture = async () => {
        const [deployer, owner, user] = await ethers.getSigners();

        const ERC1155ContractFactory = await ethers.getContractFactory("MyERC1155");
        const erc1155Contract = await ERC1155ContractFactory.connect(deployer).deploy();

        return { owner, user, deployer, erc1155Contract };
    };

    describe("balanceOf", () => {
        it("should return the balance of the given owner", async () => {
            const { erc1155Contract, deployer } = await deployContractFixture();

            const tokenId = 1;
            const amount = 100;
            await erc1155Contract.mint(deployer.address, tokenId, amount);

            expect(await erc1155Contract.balanceOf(deployer.address, tokenId)).to.equal(amount);
        });
    });

    describe("balanceOfBatch", () => {
        it("should revert if accounts mismatch with ids", async () => {
            const { erc1155Contract, deployer, user } = await deployContractFixture();
            const tokenIds = [1, 2, 3];

            await expect(
                erc1155Contract.balanceOfBatch([deployer.address, user.address], tokenIds)
            ).to.be.revertedWithCustomError(erc1155Contract, "ArraysLengthMismatch");
        });

        it("should return correct balances for multiple tokens", async () => {
            const { erc1155Contract, deployer, user } = await deployContractFixture();

            const tokenIds = [1];
            const amounts = [100];

            for (let i = 0; i < tokenIds.length; i++) {
                await erc1155Contract.mint(deployer.address, tokenIds[i], amounts[i]);
            }

            const balances = await erc1155Contract.balanceOfBatch([deployer.address], tokenIds);
            for (let i = 0; i < tokenIds.length; i++) {
                expect(balances[i]).to.equal(amounts[i]);
            }
        });
    });

    describe("setApprovalForAll", () => {
        it("should set approval for all", async () => {
            const { erc1155Contract, deployer, user } = await deployContractFixture();

            await erc1155Contract.setApprovalForAll(user.address, true);
            expect(await erc1155Contract.isApprovedForAll(deployer.address, user.address)).to.be
                .true;
        });
    });

    describe("isApprovedForAll", () => {
        it("should return correct approval status", async () => {
            const { erc1155Contract, deployer, user } = await deployContractFixture();

            expect(await erc1155Contract.isApprovedForAll(deployer.address, user.address)).to.be
                .false;
        });
    });

    describe("safeTransferFrom", () => {
        it("should revert if transfer caller not approved", async () => {
            const { erc1155Contract, deployer, owner, user } = await deployContractFixture();

            const tokenId = 1;
            const amount = 100;
            await erc1155Contract.mint(deployer.address, tokenId, amount);

            await expect(
                erc1155Contract.safeTransferFrom(owner.address, user.address, tokenId, amount, "0x")
            ).to.be.revertedWithCustomError(erc1155Contract, "TransferCallerNotApproved");
        });

        it("should revert if insufficient balance", async () => {
            const { erc1155Contract, deployer, user } = await deployContractFixture();

            const tokenId = 1;
            const amount = 100;
            await erc1155Contract.mint(deployer.address, tokenId, amount);

            await expect(
                erc1155Contract.safeTransferFrom(deployer.address, user.address, tokenId, 200, "0x")
            ).to.be.revertedWithCustomError(erc1155Contract, "InsufficientBalance");
        });

        it("should transfer tokens safely", async () => {
            const { erc1155Contract, deployer, user } = await deployContractFixture();
            const tokenId = 1;
            const amount = 100;
            await erc1155Contract.mint(deployer.address, tokenId, amount);

            await erc1155Contract.safeTransferFrom(
                deployer.address,
                user.address,
                tokenId,
                amount,
                "0x"
            );

            expect(await erc1155Contract.balanceOf(user.address, tokenId)).to.equal(amount);
        });
    });

    describe("safeBatchTransferFrom", () => {
        it("should revert if transfer caller not approved", async () => {
            const { erc1155Contract, deployer, owner, user } = await deployContractFixture();

            const tokenIds = [1, 2, 3];
            const amounts = [100, 200, 300];

            await expect(
                erc1155Contract.safeBatchTransferFrom(
                    owner.address,
                    user.address,
                    tokenIds,
                    amounts,
                    "0x"
                )
            ).to.be.revertedWithCustomError(erc1155Contract, "TransferCallerNotApproved");
        });

        it("should revert if accounts mismatch with ids", async () => {
            const { erc1155Contract, deployer, user } = await deployContractFixture();
            const tokenIds = [1, 2, 3];
            const amounts = [100, 200];

            await expect(
                erc1155Contract.safeBatchTransferFrom(
                    deployer.address,
                    user.address,
                    tokenIds,
                    amounts,
                    "0x"
                )
            ).to.be.revertedWithCustomError(erc1155Contract, "ArraysLengthMismatch");
        });

        it("should revert if insufficient balance", async () => {
            const { erc1155Contract, deployer, user } = await deployContractFixture();
            const tokenIds = [1];
            const amounts = [100];

            for (let i = 0; i < tokenIds.length; i++) {
                await erc1155Contract.mint(deployer.address, tokenIds[i], amounts[i]);
            }

            await expect(
                erc1155Contract.safeBatchTransferFrom(
                    deployer.address,
                    user.address,
                    tokenIds,
                    [200],
                    "0x"
                )
            ).to.be.revertedWithCustomError(erc1155Contract, "InsufficientBalance");
        });

        it("should transfer batch of tokens safely", async () => {
            const { erc1155Contract, deployer, user } = await deployContractFixture();

            const tokenIds = [1];
            const amounts = [100];
            for (let i = 0; i < tokenIds.length; i++) {
                await erc1155Contract.mint(deployer.address, tokenIds[i], amounts[i]);
            }

            await erc1155Contract.safeBatchTransferFrom(
                deployer.address,
                user.address,
                tokenIds,
                amounts,
                "0x"
            );

            const balances = await erc1155Contract.balanceOfBatch([user.address], tokenIds);
            for (let i = 0; i < tokenIds.length; i++) {
                expect(balances[i]).to.equal(amounts[i]);
            }
        });
    });

    describe("mint", () => {
        it("should mint tokens to the specified address", async () => {
            const { erc1155Contract, deployer, user } = await deployContractFixture();

            const tokenId = 1;
            const amount = 100;
            await erc1155Contract.connect(deployer).mint(deployer.address, tokenId, amount);

            expect(await erc1155Contract.balanceOf(deployer.address, tokenId)).to.equal(amount);
        });

        it("should revert if not called by the owner", async () => {
            const { erc1155Contract, user } = await deployContractFixture();

            const tokenId = 1;
            const amount = 100;
            await expect(
                erc1155Contract.connect(user).mint(user.address, tokenId, amount)
            ).to.be.revertedWithCustomError(erc1155Contract, "NotTokenOwner");
        });
    });

    describe("burn", () => {
        it("should burn tokens from the specified address", async () => {
            const { erc1155Contract, deployer, user } = await deployContractFixture();

            const tokenId = 1;
            const initialAmount = 100;
            await erc1155Contract.connect(deployer).mint(deployer.address, tokenId, initialAmount);

            const burnAmount = 50;
            await erc1155Contract.connect(deployer).burn(deployer.address, tokenId, burnAmount);

            expect(await erc1155Contract.balanceOf(deployer.address, tokenId)).to.equal(
                initialAmount - burnAmount
            );
        });

        it("should revert if not called by the owner", async () => {
            const { erc1155Contract, user } = await deployContractFixture();
            const tokenId = 1;
            const amount = 100;
            await expect(
                erc1155Contract.connect(user).burn(user.address, tokenId, amount)
            ).to.be.revertedWithCustomError(erc1155Contract, "NotTokenOwner");
        });

        it("should revert if the balance is insufficient", async () => {
            const { erc1155Contract, deployer, user } = await deployContractFixture();
            const tokenId = 1;
            const amount = 100;
            await erc1155Contract.connect(deployer).mint(deployer.address, tokenId, amount);

            const burnAmount = 150;
            await expect(
                erc1155Contract.connect(deployer).burn(deployer.address, tokenId, burnAmount)
            ).to.be.revertedWithCustomError(erc1155Contract, "InsufficientBalance");
        });
    });

    describe("_doSafeTransferAcceptanceCheck", () => {
        it("should revert if the recipient rejects the transfer", async () => {
            const { erc1155Contract, deployer, user } = await deployContractFixture();
            const tokenId = 1;
            const amount = 100;
            await erc1155Contract.connect(deployer).mint(deployer.address, tokenId, amount);

            // Create a contract that rejects the transfer
            const rejectingContract = await ethers.getContractFactory("Mock");
            const rejectingInstance = await rejectingContract.deploy();

            await expect(
                erc1155Contract
                    .connect(deployer)
                    .safeTransferFrom(user.address, rejectingInstance.address, tokenId, amount, [])
            ).to.be.revertedWithCustomError(erc1155Contract, "TransferRejectedByRecipient");
        });

        it("should revert if the recipient is not an ERC1155Receiver implementer", async () => {
            const { erc1155Contract, deployer, user } = await deployContractFixture();
            const tokenId = 1;
            const amount = 100;
            await erc1155Contract.connect(deployer).mint(deployer.address, tokenId, amount);

            // Create a contract that is not an ERC1155Receiver implementer
            const nonImplementerContract = await ethers.getContractFactory("Mock");
            const nonImplementerInstance = await nonImplementerContract.deploy();

            await expect(
                erc1155Contract
                    .connect(deployer)
                    .safeTransferFrom(
                        user.address,
                        nonImplementerInstance.address,
                        tokenId,
                        amount,
                        []
                    )
            ).to.be.revertedWithCustomError(
                erc1155Contract,
                "TransferNonERC1155ReceiverImplementer"
            );
        });
    });

    describe("uri", () => {
        it("should return the correct URI for the specified token ID", async () => {
            const { erc1155Contract } = await deployContractFixture();
            const tokenId = 1;
            const expectedURI = "https://myapi.com/token/0";
            expect(await erc1155Contract.uri(tokenId)).to.equal(expectedURI);
        });
    });

    describe("supportsInterface", () => {
        it("should return true for supported interfaces", async () => {
            const { erc1155Contract } = await deployContractFixture();
            const IERC1155InterfaceId = ethers.utils.id("IERC1155");
            const IERC1155MetadataURIInterfaceId = ethers.utils.id("IERC1155MetadataURI");

            expect(await erc1155Contract.supportsInterface(IERC1155InterfaceId)).to.be.true;
            expect(await erc1155Contract.supportsInterface(IERC1155MetadataURIInterfaceId)).to.be
                .true;
        });

        it("should return false for unsupported interfaces", async () => {
            const { erc1155Contract } = await deployContractFixture();

            // const unsupportedInterfaceId = ethers.utils.id("UnsupportedInterface");

            // expect(await myERC1155.supportsInterface(unsupportedInterfaceId)).to.be.false;
            const unsupportedInterfaceId = "0x12345678"; // Non-existent interface ID

            expect(await erc1155Contract.supportsInterface(unsupportedInterfaceId)).to.be.false;
        });
    });
});
