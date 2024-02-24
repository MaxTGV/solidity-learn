// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "hardhat/console.sol";

contract DAO is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    address public tokenAddress;
    uint256 public quorumVotes = 0;
    uint256 public quorumPercentage = 50;
    uint256 public constant PROPOSALS_PERIOD = 1 days;
    uint256 public debatingPeriod = 1;

    struct Proposal {
        address recipient;
        string description;
        bytes callData;
        uint256 votesFor;
        uint256 votesAgainst;
        bool executed;
    }

    struct Deposit {
        uint256 amount; // Amount of deposited tokens
        uint256 timestamp; // Timestamp of the deposit
    }

    Proposal[] public proposals;

    mapping(address => Deposit) public deposits;
    mapping(address => bool) public voted;
    mapping(uint256 => uint256) public proposalEndTime;

    event ProposalAdded(uint256 indexed proposalId, address recipient, string description);
    event DepositMade(address indexed account, uint256 amount);
    event Withdrawal(address indexed account, uint256 amountToWithdraw);
    event ProposalVoted(uint256 indexed proposalId, address indexed voter, bool support);
    event ProposalExecuted(uint256 indexed id, address recipient, string description);
    event ProposalSucceeded();

    error ZeroAmountError();
    error VotingInProgress();
    error NoActiveDeposit();
    error InsufficientVotes();
    error VotingEnded();
    error AlreadyVoted();
    error ProposalNotEnded();
    error ProposalAlreadyExecuted();
    error CallToProposalFailed();
    error InvalidQuorumPercentage();

    constructor(address _tokenAddress) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(ADMIN_ROLE, msg.sender);
        tokenAddress = _tokenAddress;
    }

    /// @notice The function of creating a proposal (proposal) that will be considered for acceptance by all the participants of the dao
    function addProposal(
        address recipient,
        string memory description,
        bytes memory callData
    ) external onlyRole(ADMIN_ROLE) {
        Proposal memory newProposal = Proposal({
            recipient: recipient,
            description: description,
            callData: callData,
            votesFor: 0,
            votesAgainst: 0,
            executed: false
        });

        proposals.push(newProposal);
        proposalEndTime[proposals.length - 1] =
            block.timestamp +
            (debatingPeriod * PROPOSALS_PERIOD);

        emit ProposalAdded(proposals.length - 1, recipient, description);
    }

    /// @notice  Function to deposit(freeze) tokens, it should store information about the frozen tokens
    function deposit(uint256 amount) external {
        if (amount == 0) {
            revert ZeroAmountError();
        }

        TransferHelper.safeTransferFrom(tokenAddress, msg.sender, address(this), amount);

        deposits[msg.sender] = Deposit(amount, block.timestamp);

        emit DepositMade(msg.sender, amount);
    }

    /// @notice Function outputting tokens deposited by user to his address
    function withdraw() external {
        if (voted[msg.sender]) {
            revert VotingInProgress();
        }

        if (deposits[msg.sender].amount == 0) {
            revert NoActiveDeposit();
        }

        uint256 amountToWithdraw = deposits[msg.sender].amount;
        deposits[msg.sender].amount = 0;

        TransferHelper.safeTransfer(tokenAddress, msg.sender, amountToWithdraw);

        emit Withdrawal(msg.sender, amountToWithdraw);
    }

    /// @notice A function that allows the user to vote for or against a proposal. proposals
    function vote(uint256 id, bool support) external {
        if (deposits[msg.sender].amount == 0) {
            revert InsufficientVotes();
        }

        if (proposals[id].executed) {
            revert VotingEnded();
        }

        if (voted[msg.sender]) {
            revert AlreadyVoted();
        }

        voted[msg.sender] = true;

        if (support) {
            proposals[id].votesFor += deposits[msg.sender].amount;
        } else {
            proposals[id].votesAgainst += deposits[msg.sender].amount;
        }

        emit ProposalVoted(id, msg.sender, support);
    }

    /// @notice The function that finalizes the vote and executes the call if the vote ended with the adoption of the proposal
    function finishProposal(uint256 id) external {
        if (block.timestamp < proposalEndTime[id]) {
            revert ProposalNotEnded();
        }

        Proposal storage proposal = proposals[id];

        if (proposal.executed) {
            revert ProposalAlreadyExecuted();
        }

        uint256 totalVotes = proposal.votesFor + proposal.votesAgainst;

        if (totalVotes == 0) {
            revert InsufficientVotes();
        }

        if ((proposal.votesFor * 100) >= (totalVotes * quorumPercentage)) {
            (bool success, ) = proposal.recipient.call(proposal.callData);

            if (success) {
                emit ProposalSucceeded();
            } else {
                revert CallToProposalFailed();
            }
        }

        proposal.executed = true;

        emit ProposalExecuted(id, proposal.recipient, proposal.description);
    }

    /// @notice Function for changing the minimum quorum value
    function setMinimalQuorum(uint256 newQuorum) external onlyRole(ADMIN_ROLE) {
        if (newQuorum == 0 || newQuorum > 100) {
            revert InvalidQuorumPercentage();
        }
        quorumPercentage = newQuorum;
    }

    /// @notice Function for changing the voice duration value
    function setDebatingPeriod(uint256 newPeriod) external onlyRole(ADMIN_ROLE) {
        debatingPeriod = newPeriod;
    }

    /// @notice Auxiliary function for testing
    function setProposalSuccess(uint256 id, bool result) external {
        Proposal storage proposal = proposals[id];
        proposal.executed = result;
    }
}
