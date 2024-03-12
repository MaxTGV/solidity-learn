// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/IERC1155MetadataURI.sol";

contract MyERC1155 is IERC1155, IERC1155Receiver, IERC1155MetadataURI {
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

    function balanceOf(address account, uint256 id) public view virtual override returns (uint256) {
        return _balances[account][id];
    }

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

    function setApprovalForAll(address operator, bool approved) public virtual override {
        _operatorApprovals[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }

    function isApprovedForAll(
        address account,
        address operator
    ) public view virtual override returns (bool) {
        return _operatorApprovals[account][operator];
    }

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

    function mint(address to, uint256 id, uint256 value) external {
        if (msg.sender != _owner) {
            revert NotTokenOwner();
        }
        _balances[to][id] += value;
        emit TransferSingle(msg.sender, address(0), to, id, value);
    }

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

    function uri(uint256 id) public view virtual override returns (string memory) {
        return string(abi.encodePacked("https://myapi.com/token/", id));
    }

    function _isContract(address to) internal view returns (bool) {
        uint32 size;
        assembly {
            size := extcodesize(to)
        }
        return size > 0;
    }

    function supportsInterface(bytes4 interfaceId) external pure override returns (bool) {
        return
            interfaceId == type(IERC1155).interfaceId ||
            interfaceId == type(IERC1155MetadataURI).interfaceId;
    }

    function onERC1155Received(
        address operator,
        address from,
        uint256 id,
        uint256 value,
        bytes calldata data
    ) external override returns (bytes4) {}

    function onERC1155BatchReceived(
        address operator,
        address from,
        uint256[] calldata ids,
        uint256[] calldata values,
        bytes calldata data
    ) external override returns (bytes4) {}
}
