// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./ERC20.sol";
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "hardhat/console.sol";

contract Staking {
    ERC20 public depositToken;
    ERC20 public rewardToken;
    uint256 public lockPeriod;
    uint256 public rewardPercentage;

    /// @dev Structure for storing information about user's deposit
    struct Deposit {
        uint256 amount;
        uint256 timestamp;
        bool rewardClaimed;
    }

    /// @dev Mapping to store each user's deposits
    mapping(address => Deposit) public deposits;

    error ZeroAmountError();
    error InsufficientAllowanceError();
    error InsufficientBalanceError();
    error NoActiveDepositError();
    error LockPeriodNotEndedError();
    error RewardAlreadyClaimedError();
    error RewardNotClaimedError();

    event DepositMade(address indexed user, uint256 amount, uint256 timestamp);
    event RewardClaimed(address indexed user, uint256 amount);
    event Withdrawal(address indexed user, uint256 amount);

    constructor(
        address _depositToken,
        address _rewardToken,
        uint256 _lockPeriod,
        uint256 _rewardPercentage
    ) {
        depositToken = ERC20(_depositToken);
        rewardToken = ERC20(_rewardToken);
        lockPeriod = _lockPeriod;
        rewardPercentage = _rewardPercentage;
    }

    /// @notice Function transferring tokens from user address to contract address
    function deposit(uint256 amount) external {
        if (amount == 0) {
            revert ZeroAmountError();
        }

        if (depositToken.allowance(msg.sender, address(this)) < amount) {
            revert InsufficientAllowanceError();
        }
        if (depositToken.balanceOf(msg.sender) < amount) {
            revert InsufficientBalanceError();
        }

        TransferHelper.safeTransferFrom(address(depositToken), msg.sender, address(this), amount);

        deposits[msg.sender] = Deposit(amount, block.timestamp, false);

        emit DepositMade(msg.sender, amount, block.timestamp);
    }

    /// @notice Function to receive an award
    function claimRewards() external {
        Deposit storage depositInfo = deposits[msg.sender];

        if (depositInfo.amount == 0) {
            revert NoActiveDepositError();
        }

        if (block.timestamp < depositInfo.timestamp + lockPeriod) {
            revert LockPeriodNotEndedError();
        }

        if (depositInfo.rewardClaimed) {
            revert RewardAlreadyClaimedError();
        }

        uint256 rewardAmount = calculateReward(depositInfo.amount);

        depositInfo.rewardClaimed = true;

        TransferHelper.safeTransfer(address(rewardToken), msg.sender, rewardAmount);

        emit RewardClaimed(msg.sender, rewardAmount);
    }

    /// @notice Function outputting tokens deposited by user to his address
    function withdraw() external {
        Deposit storage depositInfo = deposits[msg.sender];

        if (depositInfo.amount == 0) {
            revert NoActiveDepositError();
        }

        if (!depositInfo.rewardClaimed) {
            revert RewardNotClaimedError();
        }

        TransferHelper.safeTransfer(address(depositToken), msg.sender, depositInfo.amount);

        depositInfo.amount = 0;
        depositInfo.timestamp = 0;
        depositInfo.rewardClaimed = false;

        emit Withdrawal(msg.sender, depositInfo.amount);
    }

    /// @notice Function for calculating the award
    function calculateReward(uint256 depositAmount) public view returns (uint256) {
        return (depositAmount * rewardPercentage) / 100;
    }
}
