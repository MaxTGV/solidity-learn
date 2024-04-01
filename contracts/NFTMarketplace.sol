// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NFTMarketplace is ERC721, AccessControl {
    bytes32 public constant ARTIST_ROLE = keccak256("ARTIST_ROLE");
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Offer {
        uint256 price;
        address tokenAddress;
        bool isForSale;
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
    event TokenListed(uint256 indexed tokenId, uint256 price, address indexed tokenAddress);
    event TokenOfferCancelled(uint256 tokenId);

    constructor() ERC721("NFT Marketplace", "NFTM") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(ARTIST_ROLE, msg.sender);
    }

    /// @notice  The function that creates a new nft instance accesses the ERC721 contract and mines the new token to the user's address
    function createItem(string memory tokenUri) external {
        if (!hasRole(ARTIST_ROLE, msg.sender)) {
            revert OnlyArtist();
        }

        uint256 newItemId = totalSupply() + 1;
        _mint(msg.sender, newItemId);
        emit TokenCreated(newItemId, tokenUri);
    }

    /// @notice Function for listing (putting up for sale) a token by its id
    function listItem(uint256 _tokenId, uint256 _price, address _tokenAddress) external {
        if (ownerOf(_tokenId) != msg.sender) {
            revert NotTokenOwner();
        }

        if (_price == 0) {
            revert ZeroPrice();
        }

        tokenOffers[_tokenId] = Offer(_price, _tokenAddress, true);

        emit TokenListed(_tokenId, _price, _tokenAddress);
    }

    /// @notice Function that buys a specific token if it has been put up for sale
    function buyItem(uint256 _tokenId) external {
        if (!tokenExists(_tokenId) || !tokenOffers[_tokenId].isForSale) {
            revert TokenNotForSale();
        }

        Offer memory offer = tokenOffers[_tokenId];
        address tokenOwner = ownerOf(_tokenId);
        address seller = tokenOwner;

        if (offer.tokenAddress == address(0)) {
            if (address(this).balance < offer.price) {
                revert InsufficientEtherSent();
            }
        } else {
            bool allowance = IERC20(offer.tokenAddress).allowance(msg.sender, address(this)) >=
                offer.price;
            if (!allowance) {
                revert InsufficientAllowance();
            }
        }

        safeTransferFrom(seller, msg.sender, _tokenId);

        delete tokenOffers[_tokenId];

        if (offer.tokenAddress == address(0)) {
            payable(seller).transfer(offer.price);
        } else {
            bool success = IERC20(offer.tokenAddress).transferFrom(msg.sender, seller, offer.price);
            if (!success) {
                revert TokenTransferFailed();
            }
        }
    }

    /// @notice A function that allows the user to cancel the listing
    function cancel(uint256 _tokenId) external {
        if (ownerOf(_tokenId) != msg.sender) {
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

    function tokenExists(uint256 _tokenId) internal view returns (bool) {
        return _exists(_tokenId);
    }

    /// @notice  Function for putting ether on the contract
    function deposit() external payable {}

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
