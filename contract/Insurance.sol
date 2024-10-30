// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Insurance{
    address public owner;
    uint256 public policyCount;

    struct Policy {
        uint256 id;
        string policyType;
        uint256 premium;
        uint256 payoutAmount;
        uint256 duration;
        bool active;
    }

    struct Claim {
        uint256 policyId;
        address claimant;
        bool verified;
        bool paidOut;
    }

    mapping(uint256 => Policy) public policies;
    mapping(address => uint256[]) public userPolicies;
    mapping(uint256 => Claim) public claims;
    uint256 public claimCount;

    event PolicyCreated(uint256 policyId, string policyType, uint256 premium, uint256 payoutAmount);
    event PolicyPurchased(address user, uint256 policyId);
    event ClaimSubmitted(uint256 claimId, uint256 policyId, address claimant);
    event ClaimVerified(uint256 claimId, bool approved);
    event PayoutIssued(uint256 claimId, address claimant, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can execute this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }
}