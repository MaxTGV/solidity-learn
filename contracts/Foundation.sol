// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Foundation is Ownable {
    mapping(address => uint) public donations;
    address[] public donators;
    address public immutable donationsReceiver;
    string public description;

    /// @notice Custom bug to check for positive donation
    error InvalidDonation();

    /// @notice Custom bug to check for sufficient funds on a contract
    error InsufficientFunds();

    /// @notice Donation Tracking Event
    event DonationReceived(address indexed donor, uint amount);

    constructor(address _donationReceiver, string memory _description) payable {
        donationsReceiver = _donationReceiver;
        description = _description;

        /// @notice If ether is donated at deplo, add it to the donations
        if (msg.value > 0) {
            addDonateInfo();
            /// @notice Start event
            emit DonationReceived(msg.sender, msg.value);
        }
    }

    function addDonateInfo() internal {
        /// @dev Adding the donor's address to the array
        if (donations[msg.sender] == 0) {
            donators.push(msg.sender);
        }

        /// @notice Saving information about the amount of the donation
        donations[msg.sender] += msg.value;
    }

    /// @notice Function for making a donation
    function donate() external payable {
        // Check for 0
        if (msg.value == 0) {
            revert InvalidDonation();
        }

        addDonateInfo();
    }

    /// @notice Function for transferring funds from a contract to another address
    function sendFundsToReceiver(uint256 amount) external onlyOwner {
        /// @notice Checking for sufficiency of funds on the contract
        if (amount > address(this).balance) {
            revert InsufficientFunds();
        }

        // Send ether
        payable(donationsReceiver).transfer(amount);
    }

    receive() external payable {
        addDonateInfo();
        // Start event
        emit DonationReceived(msg.sender, msg.value);
    }

    /// @notice Function returning an array of addresses of all donors
    function getDonators() external view returns (address[] memory) {
        return donators;
    }

    /// @notice A function that returns the sum of all donations over all time
    function getSumOfDonations() external view returns (uint) {
        uint totalDonations;
        for (uint i = 0; i < donators.length; i++) {
            totalDonations += donations[donators[i]];
        }
        return totalDonations;
    }
}
