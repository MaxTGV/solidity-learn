// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@uniswap/v3-core/contracts/libraries/FixedPoint96.sol";
import "@uniswap/v3-periphery/contracts/interfaces/INonfungiblePositionManager.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@uniswap/v3-core/contracts/libraries/TickMath.sol";
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";

contract DexAdapter {
    using FixedPoint96 for uint256;

    INonfungiblePositionManager public positionManager;
    ISwapRouter public swapRouter;

    address private owner;

    struct PositionInfo {
        address owner;
        address token0;
        address token1;
        uint128 liquidity;
    }

    mapping(uint256 => PositionInfo) public positions;

    event PoolCreated(address indexed tokenA, address indexed tokenB, address pair);
    event PositionMinted(
        uint256 indexed tokenId,
        address indexed owner,
        address indexed token0,
        address token1,
        uint128 liquidity
    );
    event FeesCollected(uint256 amount0, uint256 amount1);
    event SwapSuccess();
    event LiquidityIncreased(uint128 liquidity, uint256 amount0, uint256 amount1);

    error OnlyOwnerError();
    error IdenticalAddressesError();
    error InvalidMintAmountsError();
    error MintFailedError();
    error InsufficientAllowanceError();

    constructor(address _positionManager, address _swapRouter) {
        positionManager = INonfungiblePositionManager(_positionManager);
        swapRouter = ISwapRouter(_swapRouter);
        owner = msg.sender;
    }

    function createPool(
        address token0,
        address token1,
        uint24 fee,
        uint160 sqrtPriceX96
    ) external returns (address pair) {
        if (msg.sender != owner) {
            revert OnlyOwnerError();
        }

        (address tokenA, address tokenB) = _sortTokens(token0, token1);

        pair = positionManager.createAndInitializePoolIfNecessary(
            tokenA,
            tokenB,
            fee,
            sqrtPriceX96
        );

        emit PoolCreated(tokenA, tokenB, pair);
    }

    function mintNewPosition(
        address token0,
        address token1,
        uint24 poolFee,
        uint256 amount0ToMint,
        uint256 amount1ToMint,
        int24 minTick,
        int24 maxTick
    ) external returns (uint256 tokenId, uint128 liquidity, uint256 amount0, uint256 amount1) {
        (address tokenA, address tokenB) = _sortTokens(token0, token1);

        TransferHelper.safeTransferFrom(tokenA, msg.sender, address(this), amount0ToMint);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, address(this), amount1ToMint);

        TransferHelper.safeApprove(tokenA, address(positionManager), amount0ToMint);
        TransferHelper.safeApprove(tokenB, address(positionManager), amount1ToMint);

        INonfungiblePositionManager.MintParams memory params = INonfungiblePositionManager
            .MintParams({
                token0: tokenA,
                token1: tokenB,
                fee: poolFee,
                tickLower: minTick,
                tickUpper: maxTick,
                amount0Desired: amount0ToMint,
                amount1Desired: amount1ToMint,
                amount0Min: 0,
                amount1Min: 0,
                recipient: address(this),
                deadline: block.timestamp
            });

        (tokenId, liquidity, amount0, amount1) = positionManager.mint(params);

        if (tokenId == 0) {
            revert MintFailedError();
        }

        positions[tokenId] = PositionInfo({
            owner: msg.sender,
            token0: tokenA,
            token1: tokenB,
            liquidity: liquidity
        });

        emit PositionMinted(tokenId, msg.sender, tokenA, tokenB, liquidity);
    }

    function collectAllFees(uint256 tokenId) external returns (uint256 amount0, uint256 amount1) {
        // Caller must own the ERC721 position
        if (positions[tokenId].owner != msg.sender) {
            revert OnlyOwnerError();
        }

        // Set amount0Max and amount1Max to uint256.max to collect all fees
        // Alternatively can set recipient to msg.sender and avoid another transaction in `sendToOwner`
        INonfungiblePositionManager.CollectParams memory params = INonfungiblePositionManager
            .CollectParams({
                tokenId: tokenId,
                recipient: address(this),
                amount0Max: type(uint128).max,
                amount1Max: type(uint128).max
            });

        // Collect fees
        (amount0, amount1) = positionManager.collect(params);
        emit FeesCollected(amount0, amount1);

        // Send collected fees back to owner
        _sendToOwner(tokenId, amount0, amount1);
    }

    function decreaseLiquidity(
        uint256 tokenId,
        uint128 liquidity
    ) external returns (uint256 amount0, uint256 amount1) {
        // Ensure that the caller is the owner of the position
        if (positions[tokenId].owner != msg.sender) {
            revert OnlyOwnerError();
        }

        // Decrease liquidity
        INonfungiblePositionManager.DecreaseLiquidityParams
            memory params = INonfungiblePositionManager.DecreaseLiquidityParams({
                tokenId: tokenId,
                liquidity: liquidity,
                amount0Min: 0,
                amount1Min: 0,
                deadline: block.timestamp
            });

        (amount0, amount1) = positionManager.decreaseLiquidity(params);

        positions[tokenId].liquidity -= liquidity;

        _sendToOwner(tokenId, amount0, amount1);
    }

    function increaseLiquidity(
        uint256 tokenId,
        uint256 amountAdd0,
        uint256 amountAdd1
    ) external returns (uint128 liquidity, uint256 amount0, uint256 amount1) {
        if (positions[tokenId].owner != msg.sender) {
            revert OnlyOwnerError();
        }

        INonfungiblePositionManager.IncreaseLiquidityParams
            memory params = INonfungiblePositionManager.IncreaseLiquidityParams({
                tokenId: tokenId,
                amount0Desired: amountAdd0,
                amount1Desired: amountAdd1,
                amount0Min: 0,
                amount1Min: 0,
                deadline: block.timestamp
            });

        (liquidity, amount0, amount1) = positionManager.increaseLiquidity(params);

        positions[tokenId].liquidity += liquidity;

        emit LiquidityIncreased(liquidity, amount0, amount1);
    }

    function swapExactInput(
        address tokenIn,
        uint256 amountIn,
        uint256 amountOutMinimum,
        bytes memory path
    ) external returns (uint256 amountOut) {
        // Проверяем, что контракт уже получил разрешение на расход токенов
        if (IERC20(tokenIn).allowance(msg.sender, address(this)) < amountIn) {
            revert InsufficientAllowanceError();
        }

        // Передаем токены контракту
        TransferHelper.safeTransferFrom(tokenIn, msg.sender, address(this), amountIn);

        // Передаем токены контракту для свопа
        TransferHelper.safeApprove(tokenIn, address(swapRouter), amountIn);

        // Выполняем своп
        amountOut = swapRouter.exactInput(
            ISwapRouter.ExactInputParams({
                path: path,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: amountOutMinimum
            })
        );

        emit SwapSuccess();
    }

    function swapExactOutput(
        address tokenIn,
        uint256 amountOut,
        uint256 amountInMaximum,
        bytes memory path
    ) external returns (uint256 amountIn) {
        // Проверяем, что контракт уже получил разрешение на расход токенов
        if (IERC20(tokenIn).allowance(msg.sender, address(this)) < amountOut) {
            revert InsufficientAllowanceError();
        }

        // Передаем токены контракту для свопа
        TransferHelper.safeTransferFrom(tokenIn, msg.sender, address(this), amountOut);

        // Передаем токены контракту для свопа
        TransferHelper.safeApprove(tokenIn, address(swapRouter), amountOut);

        // Выполняем своп
        amountIn = swapRouter.exactOutput(
            ISwapRouter.ExactOutputParams({
                path: path,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountOut: amountOut,
                amountInMaximum: amountInMaximum
            })
        );

        emit SwapSuccess();
    }

    function _sendToOwner(uint256 tokenId, uint256 amount0, uint256 amount1) internal {
        // get owner of contract
        address _owner = positions[tokenId].owner;
        address token0 = positions[tokenId].token0;
        address token1 = positions[tokenId].token1;
        // send collected fees to owner
        TransferHelper.safeTransfer(token0, _owner, amount0);
        TransferHelper.safeTransfer(token1, _owner, amount1);
    }

    function _sortTokens(
        address tokenA,
        address tokenB
    ) public pure returns (address token0, address token1) {
        if (tokenA == tokenB) {
            revert IdenticalAddressesError();
        }

        return tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
    }
}
