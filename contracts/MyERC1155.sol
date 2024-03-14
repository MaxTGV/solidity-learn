// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/IERC1155MetadataURI.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MyERC1155 is IERC1155, IERC1155MetadataURI {
    using Strings for uint256;

    mapping(address => mapping(uint256 => uint256)) private _balances;
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    address private _owner;

    error NotTokenOwner();
    error ArraysLengthMismatch();
    error TransferCallerNotApproved();
    error InsufficientBalance();
    error TransferRejectedByRecipient();
    error TransferNonERC1155ReceiverImplementer();

    // event ApprovalForAll(address indexed sender, address indexed operator, bool approved);

    constructor() {
        _owner = msg.sender;
    }

    /// @notice Function returning the balance (number) of tokens belonging to the user by the specified token id specified token id
    function balanceOf(address account, uint256 id) public view virtual override returns (uint256) {
        return _balances[account][id];
    }

    /// @notice Function that returns balances (number) of tokens belonging to users by specified token id
    function balanceOfBatch(
        address[] memory accounts,
        uint256[] memory ids
    ) public view virtual override returns (uint256[] memory) {
        if (accounts.length != ids.length) {
            revert ArraysLengthMismatch();
        }

        uint256[] memory balances = new uint256[](accounts.length);
        for (uint256 i = 0; i < accounts.length; i++) {
            balances[i] = balanceOf(accounts[i], ids[i]);
        }

        return balances;
    }

    /// @notice Function returning reference to metadata
    function uri(uint256 id) public view virtual override returns (string memory) {
        return string(abi.encodePacked("https://myapi.com/token/", id.toString()));
    }

    /// @notice The function that gives the right to perform transfers with all tokens of the user who called it user for address operator
    function setApprovalForAll(address operator, bool approved) public virtual override {
        _operatorApprovals[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }

    /// @notice The function returns information whether the operator has the right to transfer tokens to the owner's tokens.
    function isApprovedForAll(
        address account,
        address operator
    ) public view virtual override returns (bool) {
        return _operatorApprovals[account][operator];
    }

    /// @notice Function transferring token by tokenId of value quantity from account from to account to
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public virtual override {
        if (from != msg.sender && !isApprovedForAll(from, msg.sender)) {
            revert TransferCallerNotApproved();
        }
        if (_balances[from][id] < amount) {
            revert InsufficientBalance();
        }

        _balances[from][id] -= amount;
        _balances[to][id] += amount;

        emit TransferSingle(msg.sender, from, to, id, amount);

        _doSafeTransferAcceptanceCheck(msg.sender, from, to, id, amount, data);
    }

    /// @notice A function that transfers tokens by ids from the ids array with a quantity from the values array, from an account from to account to
    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public virtual override {
        if (from != msg.sender && !isApprovedForAll(from, msg.sender)) {
            revert TransferCallerNotApproved();
        }

        if (ids.length != amounts.length) {
            revert ArraysLengthMismatch();
        }

        for (uint256 i = 0; i < ids.length; i++) {
            uint256 id = ids[i];
            uint256 amount = amounts[i];

            if (_balances[from][id] < amount) {
                revert InsufficientBalance();
            }

            _balances[from][id] -= amount;
            _balances[to][id] += amount;

            emit TransferSingle(msg.sender, from, to, id, amount);

            _doSafeTransferAcceptanceCheck(msg.sender, from, to, id, amount, data);
        }

        emit TransferBatch(msg.sender, from, to, ids, amounts);
    }

    /// @notice The function mines the token with the provided token id and value to the address to
    function mint(address to, uint256 id, uint256 value) external {
        if (msg.sender != _owner) {
            revert NotTokenOwner();
        }
        _balances[to][id] += value;
        emit TransferSingle(msg.sender, address(0), to, id, value);
    }

    /// @notice Function burning a token by id in the amount of value from the provided address from
    function burn(address from, uint256 id, uint256 value) external {
        if (msg.sender != _owner) {
            revert NotTokenOwner();
        }

        if (_balances[from][id] < value) {
            revert InsufficientBalance();
        }

        _balances[from][id] -= value;
        emit TransferSingle(msg.sender, from, address(0), id, value);
    }

    /// @notice Checks if the recipient is a contract and handles ERC1155 token reception
    function _doSafeTransferAcceptanceCheck(
        address operator,
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) private {
        if (_isContract(to)) {
            try IERC1155Receiver(to).onERC1155Received(operator, from, id, amount, data) returns (
                bytes4 response
            ) {
                if (response != IERC1155Receiver(to).onERC1155Received.selector) {
                    revert TransferRejectedByRecipient();
                }
            } catch Error(string memory reason) {
                revert(reason);
            } catch {
                revert TransferNonERC1155ReceiverImplementer();
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

    /// @notice Checks if the contract supports the specified interface
    function supportsInterface(bytes4 interfaceId) external pure override returns (bool) {
        return
            interfaceId == type(IERC1155).interfaceId ||
            interfaceId == type(IERC1155MetadataURI).interfaceId;
    }
}
