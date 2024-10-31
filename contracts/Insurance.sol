// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InsurancePlatform {
    address public owner;
    uint256 public policyCount;
    uint256 public claimCount;

    struct Policy {
        uint256 id;
        string policyType;
        uint256 premium;
        uint256 payoutAmount;
        uint256 duration;
        uint256 startTime;
        bool active;
    }

    struct Claim {
        uint256 policyId;
        address claimant;
        bool verified;
        bool paidOut;
        string status; // "Pending", "Approved", "Rejected"
    }

    mapping(uint256 => Policy) public policies; // Policy ID to Policy details
    mapping(address => uint256[]) public userPolicies; // User address to list of policy IDs
    mapping(uint256 => Claim) public claims; // Claim ID to Claim details
    mapping(address => mapping(uint256 => bool)) public hasClaimed; // Track if a user has claimed a specific policy
    mapping(address => mapping(uint256 => bool)) public refundedPolicies;

    event PolicyCreated(uint256 policyId, string policyType, uint256 premium, uint256 payoutAmount);
    event PolicyPurchased(address user, uint256 policyId);
    event ClaimSubmitted(uint256 claimId, uint256 policyId, address claimant);
    event ClaimVerified(uint256 claimId, bool approved);
    event PayoutIssued(uint256 claimId, address claimant, uint256 amount);
    event PolicyDeactivated(uint256 policyId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can execute this function");
        _;
    }
    
    modifier noActiveClaims(uint256 _policyId) {
        for (uint256 i = 1; i <= claimCount; i++) {
            if (claims[i].policyId == _policyId && !claims[i].paidOut && keccak256(abi.encodePacked(claims[i].status)) == keccak256(abi.encodePacked("Pending"))) {
                revert("There is already an active claim for this policy");
            }
        }
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Create a new insurance policy
    function createPolicy(
        string memory _policyType,
        uint256 _premium,
        uint256 _payoutAmount,
        uint256 _duration
    ) public onlyOwner {
        policyCount++;
        policies[policyCount] = Policy(
            policyCount,
            _policyType,
            _premium,
            _payoutAmount,
            _duration,
            block.timestamp,
            true
        );
        emit PolicyCreated(policyCount, _policyType, _premium, _payoutAmount);
    }

    // Deactivate a policy
    function deactivatePolicy(uint256 _policyId) public onlyOwner {
    policies[_policyId].active = false;
    emit PolicyDeactivated(_policyId);
}

    // Purchase a policy by paying the premium
    function purchasePolicy(uint256 _policyId) public payable {
    Policy memory policy = policies[_policyId];
    require(policy.active, "Policy is not active");
    require(block.timestamp <= policy.startTime + policy.duration, "Policy has expired");
    require(msg.value == policy.premium, "Incorrect premium amount");

    userPolicies[msg.sender].push(_policyId);
    emit PolicyPurchased(msg.sender, _policyId);
}

    
    // Submit a claim for an active policy
    function submitClaim(uint256 _policyId) public noActiveClaims(_policyId) {
        require(isPolicyHolder(msg.sender, _policyId), "Not a policy holder");
        require(!hasClaimed[msg.sender][_policyId], "Claim already submitted for this policy");

        Policy memory policy = policies[_policyId];
        require(block.timestamp <= policy.startTime + policy.duration, "Policy has expired");

        claimCount++;
        claims[claimCount] = Claim(_policyId, msg.sender, false, false, "Pending");
        hasClaimed[msg.sender][_policyId] = true;
        emit ClaimSubmitted(claimCount, _policyId, msg.sender);
    }


    // Verify and approve or reject a claim
    function verifyClaim(uint256 _claimId, bool _approved) public onlyOwner {
        Claim storage claim = claims[_claimId];
        require(!claim.paidOut, "Claim already paid out");

        if (_approved) {
            claim.verified = true;
            claim.status = "Approved";
            payoutClaim(_claimId);
        } else {
            claim.status = "Rejected";
        }
        emit ClaimVerified(_claimId, _approved);
    }

    // Payout a verified claim
    function payoutClaim(uint256 _claimId) private {
        Claim storage claim = claims[_claimId];
        Policy memory policy = policies[claim.policyId];

        require(claim.verified, "Claim not verified");
        require(!claim.paidOut, "Already paid out");

        claim.paidOut = true;
        payable(claim.claimant).transfer(policy.payoutAmount);
        emit PayoutIssued(_claimId, claim.claimant, policy.payoutAmount);
    }

    function refundDeactivatedPolicy(uint256 _policyId) public {
        require(policies[_policyId].active == false, "Policy is still active");
        require(isPolicyHolder(msg.sender, _policyId), "Not a policy holder");
        require(!refundedPolicies[msg.sender][_policyId], "Already refunded");

        Policy memory policy = policies[_policyId];
        refundedPolicies[msg.sender][_policyId] = true;
        payable(msg.sender).transfer(policy.premium);
    }

    function getPolicyDetails(uint256 _policyId) public view returns ( uint256 id, string memory policyType, uint256 premium, uint256 payoutAmount, uint256 duration, uint256 startTime, bool active) {
        Policy memory policy = policies[_policyId];
        return (
            policy.id,
            policy.policyType,
            policy.premium,
            policy.payoutAmount,
            policy.duration,
            policy.startTime,
            policy.active
        );
}


    // Check if a user holds a specific policy
    function isPolicyHolder(address _user, uint256 _policyId) private view returns (bool) {
        uint256[] memory userPolicyList = userPolicies[_user];
        for (uint256 i = 0; i < userPolicyList.length; i++) {
            if (userPolicyList[i] == _policyId) {
                return true;
            }
        }
        return false;
    }

    // Get list of policies owned by a user
    function getUserPolicies(address _user) public view returns (uint256[] memory) {
        return userPolicies[_user];
    }
}
