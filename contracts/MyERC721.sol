// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MyERC721 is IERC721, IERC721Metadata {
    using Strings for uint256;

    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Mapping from token ID to owner address
    mapping(uint256 => address) private _owners;

    // Mapping owner address to token count
    mapping(address => uint256) private _balances;

    // Mapping from token ID to approved address
    mapping(uint256 => address) private _tokenApprovals;

    // Mapping from owner to operator approvals
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    // Token name
    string private _name;

    // Token symbol
    string private _symbol;

    error OwnerNotFoundError();
    error TokenURINotFoundError();
    error NotTokenOwner();
    error TokenOwnerNotFound();
    error TokenNotApprovedForTransfer();
    error TransferCallerNotAuthorized();
    error TransferToZeroAddress();
    error TransferAmountExceedsBalance();
    error ERC721ReceiverReject();
    error SettingApprovalStatusFroSelf();
    error TokenAlreadyMinted();
    error BurnOfNonOwnedToken();

    event ApprovalForAllEvent(address indexed sender, address indexed operator, bool approved);
    event TransferEvent(address indexed from, address indexed to, uint256 tokenId);
    event ApprovalEvent(address indexed owner, address indexed spender, uint256 value);

    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    function balanceOf(address owner) public view virtual override returns (uint256) {
        return _balances[owner];
    }

    function ownerOf(uint256 tokenId) public view virtual override returns (address) {
        address owner = _owners[tokenId];
        if (owner == address(0)) {
            revert OwnerNotFoundError();
        }
        return owner;
    }

    function name() public view virtual override returns (string memory) {
        return _name;
    }

    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        address owner = _owners[tokenId];
        if (owner == address(0)) {
            revert TokenURINotFoundError();
        }
        return string(abi.encodePacked("https://myapi.com/token/", tokenId.toString()));
    }

    function approve(address to, uint256 tokenId) public virtual override {
        address owner = _owners[tokenId];
        if (owner != msg.sender) {
            revert NotTokenOwner();
        }

        _tokenApprovals[tokenId] = to;
        emit Approval(owner, to, tokenId);
    }

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

    function setApprovalForAll(address operator, bool approved) public virtual override {
        address sender = msg.sender;
        if (sender == operator) {
            revert SettingApprovalStatusFroSelf();
        }

        _operatorApprovals[sender][operator] = approved;
        emit ApprovalForAllEvent(sender, operator, approved);
    }

    function isApprovedForAll(
        address owner,
        address operator
    ) public view virtual override returns (bool) {
        return _operatorApprovals[owner][operator];
    }

    function transferFrom(address from, address to, uint256 tokenId) public virtual override {
        address owner = _owners[tokenId];
        if (msg.sender != owner && !_operatorApprovals[owner][msg.sender]) {
            revert TransferCallerNotAuthorized();
        }

        _transfer(from, to, tokenId);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId) external override {
        safeTransferFrom(from, to, tokenId, "");
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public override {
        transferFrom(from, to, tokenId);
        if (!_checkOnERC721Received(from, to, tokenId, _data)) {
            revert ERC721ReceiverReject();
        }
    }

    /// @notice The function burns tokens - decreases the value of totalSupply and the balance of the address account by the amount. Can be called only by the owner of the contract.
    function burn(uint256 tokenId) public {
        address owner = ownerOf(tokenId);
        if (msg.sender != owner) {
            revert BurnOfNonOwnedToken();
        }

        _balances[owner] -= 1;
        delete _owners[tokenId];

        emit TransferEvent(owner, address(0), tokenId);
    }

    /// @notice The function mints tokens - increases the value of totalSupply and the balance of the address account by the amount.
    function mint(address to, uint256 tokenId) public {
        if (_owners[tokenId] != address(0)) {
            revert TokenAlreadyMinted();
        }

        _balances[to] += 1;
        _owners[tokenId] = to;

        emit TransferEvent(address(0), to, tokenId);
    }

    function _checkOnERC721Received(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) internal returns (bool) {
        if (!_isContract(to)) {
            return true;
        }
        bytes4 retval = IERC721Receiver(to).onERC721Received(msg.sender, from, tokenId, _data);
        return (retval == _ERC721_RECEIVED);
    }

    function _isContract(address to) internal view returns (bool) {
        uint32 size;
        assembly {
            size := extcodesize(to)
        }
        return size > 0;
    }

    /// @notice The function burns tokens - decreases the value of totalSupply and the balance of the address account by the amount. Can be called only by the owner of the contract.
    function _transfer(address from, address to, uint256 tokenId) internal {
        if (to == address(0)) {
            revert TransferToZeroAddress();
        }

        approve(address(0), tokenId);
        _balances[from] -= 1;
        _balances[to] += 1;
        _owners[tokenId] = to;

        emit TransferEvent(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId) external pure override returns (bool) {
        return
            interfaceId == type(IERC721).interfaceId ||
            interfaceId == type(IERC721Metadata).interfaceId;
    }
}
