// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "hardhat/console.sol";

contract Vesting is Ownable {
    using SafeMath for uint256;

    ERC20 public vestingToken;

    /// @notice A structure for storing information about the rights to receive tokens
    struct VestingInfo {
        uint256 totalAmount;
        uint256 withdrawAmount;
        bool distributed;
    }

    mapping(address => VestingInfo) public vestingInfo;
    mapping(uint256 => uint256) public releasePercentageByMonth;

    uint256 public constant DISTRIBUTE_RIGHTS_PERIOD = 1 days;
    uint256 public constant VESTING_DURATION = 16 weeks;

    uint256 public vestingStartTime;
    uint256 public vestingEndTime;

    event RightsDistributed(address indexed account, uint256 amount);
    event TokensWithdrawn(address indexed account, uint256 amount);

    error DistributePeriodOver();
    error ZeroAmountError();
    error RightsAlreadyDistributed();
    error VestingNotStarted();
    error VestingPeriodOver();
    error NoRightsDistributed();

    constructor(address _vestingToken) {
        vestingStartTime = block.timestamp + DISTRIBUTE_RIGHTS_PERIOD;
        vestingEndTime = vestingStartTime + VESTING_DURATION;
        vestingToken = ERC20(_vestingToken);

        releasePercentageByMonth[1] = 10;
        releasePercentageByMonth[2] = 30;
        releasePercentageByMonth[3] = 50;
        releasePercentageByMonth[4] = 100;
    }

    /// @notice Function distributing the rights to receive tokens
    function distributeRights(address account, uint256 amount) external onlyOwner {
        if (block.timestamp > vestingStartTime) {
            revert DistributePeriodOver();
        }

        if (amount == 0) {
            revert ZeroAmountError();
        }

        if (vestingInfo[account].distributed) {
            revert RightsAlreadyDistributed();
        }

        vestingInfo[account].totalAmount = amount;
        vestingInfo[account].distributed = true;

        emit RightsDistributed(account, amount);
    }

    /// @notice Function for calculating the number of user tokens available for unfreezing
    function getAvailableAmount(address _address) public view returns (uint256) {
        if (block.timestamp < vestingStartTime) {
            revert VestingNotStarted();
        }

        if (vestingInfo[_address].totalAmount == 0) {
            revert NoRightsDistributed();
        }

        uint256 elapsedMonths = (block.timestamp - vestingStartTime) / 30 days;
        uint256 totalAmount = vestingInfo[_address].totalAmount;
        uint256 withdrawAmount = vestingInfo[_address].withdrawAmount;

        uint256 availableAmount = ((totalAmount - withdrawAmount) *
            releasePercentageByMonth[elapsedMonths + 1]) / 100;

        return availableAmount;
    }

    /// @notice A function that should transfer the number of tokens available for unfreezing to the user address
    function withdrawTokens() external {
        address account = msg.sender;
        uint256 availableAmount = getAvailableAmount(account);

        vestingInfo[account].withdrawAmount += availableAmount;

        TransferHelper.safeTransfer(address(vestingToken), msg.sender, availableAmount);

        emit TokensWithdrawn(account, availableAmount);
    }
}
