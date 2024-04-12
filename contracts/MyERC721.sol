// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";

contract MyERC721 is IERC721, IERC721Metadata {
    using Strings for uint256;

    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    mapping(uint256 => address) private _owners;
    mapping(address => uint256) private _balances;
    mapping(uint256 => address) private _tokenApprovals;
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    string private _name;
    string private _symbol;

    error OwnerNotFoundError();
    error TokenURINotFoundError();
    error NotTokenOwner();
    error TokenOwnerNotFound();
    error TokenNotApprovedForTransfer();
    error TransferCallerNotAuthorized();
    error TransferToZeroAddress();
    error TransferAmountExceedsBalance();
    error SettingApprovalStatusFroSelf();
    error TokenAlreadyMinted();
    error BurnOfNonOwnedToken();
    error TransferRejectedByRecipient();
    error TransferNonERC721ReceiverImplementer();

    event ApprovalForAllEvent(address indexed sender, address indexed operator, bool approved);
    event TransferEvent(address indexed from, address indexed to, uint256 tokenId);
    event ApprovalEvent(address indexed owner, address indexed spender, uint256 value);

    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    /// @notice Function returning the balance (number) of tokens belonging to a user
    function balanceOf(address owner) public view virtual override returns (uint256) {
        return _balances[owner];
    }

    /// @notice Function returning the token owner's address by its id
    function ownerOf(uint256 tokenId) public view virtual override returns (address) {
        address owner = _owners[tokenId];
        if (owner == address(0)) {
            revert OwnerNotFoundError();
        }
        return owner;
    }

    /// @notice Function returning token name
    function name() public view virtual override returns (string memory) {
        return _name;
    }

    /// @notice Function returning token character
    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    /// @notice Function that returns a reference to metadata and takes an id token as an argument
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        address owner = _owners[tokenId];
        if (owner == address(0)) {
            revert TokenURINotFoundError();
        }
        return string(abi.encodePacked("https://myapi.com/token/", tokenId.toString()));
    }

    /// @notice Function transferring tokens from user address to contract address
    function approve(address to, uint256 tokenId) public virtual override {
        address owner = _owners[tokenId];
        if (owner != msg.sender) {
            console.log(owner, msg.sender);
            revert NotTokenOwner();
        }

        _tokenApprovals[tokenId] = to;
        emit Approval(owner, to, tokenId);
    }

    /// @notice Function returning the address of the operator who was given the right to to perform transfers from the previous function
    function getApproved(uint256 tokenId) public view virtual override returns (address) {
        address owner = _owners[tokenId];
        if (owner == address(0)) {
            revert TokenOwnerNotFound();
        }

        address approved = _tokenApprovals[tokenId];
        if (approved == address(0)) {
            revert TokenNotApprovedForTransfer();
        }

        return approved;
    }

    /// @notice The function that gives the right to perform transfers with all tokens of the user who called it user for address operator
    function setApprovalForAll(address operator, bool approved) public virtual override {
        address sender = msg.sender;
        if (sender == operator) {
            revert SettingApprovalStatusFroSelf();
        }

        _operatorApprovals[sender][operator] = approved;
        emit ApprovalForAllEvent(sender, operator, approved);
    }

    /// @notice The function returns information whether the operator has the right to transfer tokens to the owner's tokens.
    function isApprovedForAll(
        address owner,
        address operator
    ) public view virtual override returns (bool) {
        return _operatorApprovals[owner][operator];
    }

    /// @notice Function transferring token by tokenId from account from to account to
    function transferFrom(address from, address to, uint256 tokenId) public virtual override {
        address owner = _owners[tokenId];
        if (msg.sender != owner && !_operatorApprovals[owner][msg.sender]) {
            revert TransferCallerNotAuthorized();
        }

        _transfer(from, to, tokenId);
    }

    /// @notice Function transferring token by tokenId from account from to account to
    function safeTransferFrom(address from, address to, uint256 tokenId) external override {
        safeTransferFrom(from, to, tokenId, "");
    }

    /// @notice Function transferring token by tokenId from account from to account to
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public override {
        transferFrom(from, to, tokenId);
        _checkOnERC721Received(msg.sender, from, to, tokenId, _data);
    }

    /// @notice Function burning a token with the provided token id
    function burn(uint256 tokenId) public {
        address owner = ownerOf(tokenId);
        if (msg.sender != owner) {
            revert BurnOfNonOwnedToken();
        }

        _balances[owner] -= 1;
        delete _owners[tokenId];

        emit TransferEvent(owner, address(0), tokenId);
    }

    /// @notice The function mines a token with the provided token id to the to address.
    function mint(address to, uint256 tokenId) public {
        if (_owners[tokenId] != address(0)) {
            revert TokenAlreadyMinted();
        }

        _balances[to] += 1;
        _owners[tokenId] = to;

        emit TransferEvent(address(0), to, tokenId);
    }

    /// @notice Checks if the recipient is a contract and handles ERC721 token reception
    function _checkOnERC721Received(
        address operator,
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) private {
        if (_isContract(to)) {
            try IERC721Receiver(to).onERC721Received(operator, from, tokenId, _data) returns (
                bytes4 response
            ) {
                if (response != IERC721Receiver(to).onERC721Received.selector) {
                    revert TransferRejectedByRecipient();
                }
            } catch Error(string memory reason) {
                revert(reason);
            } catch {
                revert TransferNonERC721ReceiverImplementer();
            }
        }
    }

    /// @notice Checks if the recipient is a contract
    function _isContract(address to) internal view returns (bool) {
        uint32 size;
        assembly {
            size := extcodesize(to)
        }
        return size > 0;
    }

    /// @notice Internal function to transfer token ownership
    function _transfer(address from, address to, uint256 tokenId) internal {
        if (to == address(0)) {
            revert TransferToZeroAddress();
        }

        _balances[from] -= 1;
        _balances[to] += 1;
        _owners[tokenId] = to;

        emit TransferEvent(from, to, tokenId);
    }

    /// @notice Checks if the contract supports the specified interface
    function supportsInterface(bytes4 interfaceId) external pure override returns (bool) {
        return
            interfaceId == type(IERC721).interfaceId ||
            interfaceId == type(IERC721Metadata).interfaceId;
    }
}
