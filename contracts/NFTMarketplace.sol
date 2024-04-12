// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./MyERC721.sol";

contract NFTMarketplace is AccessControl {
    bytes32 public constant ARTIST_ROLE = keccak256("ARTIST_ROLE");
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    MyERC721 public _token;

    struct Offer {
        uint256 price;
        address tokenAddress;
        bool isForSale;
        address owner;
    }

    mapping(address => bool) public artists;
    mapping(uint256 => Offer) public tokenOffers;

    error OnlyAdmin();
    error OnlyArtist();
    error ZeroPrice();
    error ZeroTokenAddress();
    error NotTokenOwner();
    error TokenNotExists();
    error TokenNotForSale();
    error InsufficientEtherSent();
    error InsufficientAllowance();
    error EthTransferFailed();
    error InvalidSellerAddress();
    error TokenTransferFailed();

    event TokenCreated(uint256 newItemId, string tokenUri);
    event TokenListed(
        uint256 indexed tokenId,
        uint256 price,
        address indexed tokenAddress,
        address indexed owner
    );
    event TokenOfferCancelled(uint256 tokenId);

    constructor(address token) {
        _token = MyERC721(token);
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(ARTIST_ROLE, msg.sender);
    }

    /// @notice  The function that creates a new nft instance accesses the ERC721 contract and mines the new token to the user's address
    function createItem(string memory tokenUri) external {
        if (!hasRole(ARTIST_ROLE, msg.sender)) {
            revert OnlyArtist();
        }

        uint256 newItemId = totalSupply() + 1;
        _token.mint(msg.sender, newItemId);
        emit TokenCreated(newItemId, tokenUri);
    }

    /// @notice Function for listing (putting up for sale) a token by its id
    function listItem(uint256 _tokenId, uint256 _price, address _tokenAddress) external {
        if (_token.ownerOf(_tokenId) != msg.sender) {
            revert NotTokenOwner();
        }

        if (_price == 0) {
            revert ZeroPrice();
        }

        tokenOffers[_tokenId] = Offer(_price, _tokenAddress, true, msg.sender);

        emit TokenListed(_tokenId, _price, _tokenAddress, msg.sender);
    }

    /// @notice Function that buys a specific token if it has been put up for sale
    function buyItem(uint256 _tokenId) external payable {
        if (!tokenOffers[_tokenId].isForSale) {
            revert TokenNotForSale();
        }

        Offer memory offer = tokenOffers[_tokenId];
        address tokenOwner = _token.ownerOf(_tokenId);
        address seller = tokenOwner;

        if (offer.owner != seller) {
            revert NotTokenOwner();
        }

        if (offer.tokenAddress == address(0)) {
            if (msg.value < offer.price) {
                revert InsufficientEtherSent();
            }

            payable(seller).transfer(offer.price);
        } else {
            bool allowance = IERC20(offer.tokenAddress).allowance(msg.sender, address(this)) >=
                offer.price;
            if (!allowance) {
                revert InsufficientAllowance();
            }

            bool success = IERC20(offer.tokenAddress).transferFrom(msg.sender, seller, offer.price);
            if (!success) {
                revert TokenTransferFailed();
            }
        }

        _token.safeTransferFrom(seller, msg.sender, _tokenId);

        delete tokenOffers[_tokenId];
    }

    /// @notice A function that allows the user to cancel the listing
    function cancel(uint256 _tokenId) external {
        if (_token.ownerOf(_tokenId) != msg.sender) {
            revert NotTokenOwner();
        }

        delete tokenOffers[_tokenId];

        emit TokenOfferCancelled(_tokenId);
    }

    function hasRole(bytes32 role, address account) public view override returns (bool) {
        return AccessControl.hasRole(role, account);
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }
}
