// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./Foundation.sol";

contract FundManager {
    uint256 public numberOfFoundationsCreated;
    mapping(address foundation => address owner) public ownersOfFunds;

    // @notice Donation Tracking Event
    event FoundationCreated(
        address indexed foundationAddress,
        address indexed owner,
        string description,
        uint amount
    );

    // @notice Event to track the transfer of funds to the final recipient's address
    event FundsTransferred(
        address indexed foundationAddress,
        address indexed receiver,
        uint amount
    );

    // @notice Custom error to check for null value
    error InvalidValue();

    // @notice Custom bug to check the rights of the fund owner
    error Unauthorized();

    // @notice Custom bug to check for insufficient funds on a contract
    error InsufficientFunds();

    // @notice Function to create a new charitable foundation.
    function createFoundation(
        address donationReceiver,
        string memory description
    ) external payable {
        // @notice Deploy a new Foundation
        Foundation newFoundation = new Foundation{value: msg.value}(donationReceiver, description);

        // @notice Write the address of the fund creator in the mapping
        ownersOfFunds[address(newFoundation)] = msg.sender;

        // @notice Increase the number of funds created
        numberOfFoundationsCreated++;

        // @notice Start event
        emit FoundationCreated(address(newFoundation), msg.sender, description, msg.value);
    }

    function transferFundsToReceiver(address payable foundationAddress, uint256 amount) external {
        if (ownersOfFunds[foundationAddress] != msg.sender) {
            revert Unauthorized();
        }

        // @notice Getting an instance Foundation
        Foundation foundation = Foundation(foundationAddress);

        // @notice Checking the sufficiency of funds on the contract
        if (amount > address(this).balance) {
            revert InsufficientFunds();
        }

        // @notice Call the sendFundsToReceiver function on the fund contract
        foundation.sendFundsToReceiver(amount);

        // @notice Start event
        emit FundsTransferred(foundationAddress, foundation.donationsReceiver(), amount);
    }
}
