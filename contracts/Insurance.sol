// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InsurancePlatform {
    address public owner;
    uint256 public policyCount;
    uint256 public claimCount;

    enum ClaimStatus { Pending, Approved, Rejected }

    struct Policy {
        uint256 id;
        string policyType;
        uint256 premium;
        uint256 coverageAmount;
        uint256 duration;
        uint256 startTime;
        address policyHolder;
        bool active;
        bool renewable;
    }

    struct Claim {
        uint256 id;
        uint256 policyId;
        address claimant;
        ClaimStatus status;
        uint256 claimAmount;
        bool paidOut;
    }

    mapping(uint256 => Policy) public policies;
    mapping(uint256 => Claim) public claims;
    mapping(address => uint256[]) public userPolicies;

    event PolicyCreated(uint256 policyId, string policyType, uint256 premium, uint256 coverageAmount);
    event PolicyUpdated(uint256 policyId, string policyType, uint256 premium, uint256 coverageAmount);
    event PolicyPurchased(uint256 policyId, address policyHolder);
    event PolicyStatusChanged(uint256 policyId, bool activeStatus);
    event ClaimSubmitted(uint256 claimId, uint256 policyId, address claimant);
    event ClaimProcessed(uint256 claimId, ClaimStatus status);
    event PayoutIssued(uint256 claimId, address claimant, uint256 amount);
    event RefundIssued(uint256 policyId, address policyHolder);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    modifier onlyPolicyHolder(uint256 _policyId) {
        require(policies[_policyId].policyHolder == msg.sender, "Caller is not the policyholder");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // =======================
    // Admin Functions
    // =======================

    function createPolicy(
        string memory _policyType, 
        uint256 _premium, 
        uint256 _coverageAmount, 
        uint256 _duration, 
        bool _renewable
    ) public onlyOwner {
        policyCount++;
        policies[policyCount] = Policy({
            id: policyCount,
            policyType: _policyType,
            premium: _premium,
            coverageAmount: _coverageAmount,
            duration: _duration,
            startTime: 0,
            policyHolder: address(0),
            active: false,
            renewable: _renewable
        });
        emit PolicyCreated(policyCount, _policyType, _premium, _coverageAmount);
    }

    function modifyPolicy(
        uint256 _policyId, 
        string memory _policyType, 
        uint256 _premium, 
        uint256 _coverageAmount
    ) public onlyOwner {
        Policy storage policy = policies[_policyId];
        policy.policyType = _policyType;
        policy.premium = _premium;
        policy.coverageAmount = _coverageAmount;
        emit PolicyUpdated(_policyId, _policyType, _premium, _coverageAmount);
    }

    function changePolicyStatus(uint256 _policyId, bool _active) public onlyOwner {
        policies[_policyId].active = _active;
        emit PolicyStatusChanged(_policyId, _active);
    }

    function viewClaim(uint256 _claimId) public view onlyOwner returns (Claim memory) {
        return claims[_claimId];
    }

    function approveOrRejectClaim(uint256 _claimId, bool _approve) public onlyOwner {
        Claim storage claim = claims[_claimId];
        require(claim.status == ClaimStatus.Pending, "Claim has already been processed");

        if (_approve) {
            claim.status = ClaimStatus.Approved;
            processPayout(_claimId);
        } else {
            claim.status = ClaimStatus.Rejected;
        }
        emit ClaimProcessed(_claimId, claim.status);
    }

    function processPayout(uint256 _claimId) private {
        Claim storage claim = claims[_claimId];
        Policy storage policy = policies[claim.policyId];
        require(claim.status == ClaimStatus.Approved, "Claim has not been approved");

        claim.paidOut = true;
        payable(claim.claimant).transfer(policy.coverageAmount);
        emit PayoutIssued(_claimId, claim.claimant, policy.coverageAmount);
    }

    function refundPolicy(uint256 _policyId) public onlyOwner {
        Policy storage policy = policies[_policyId];
        require(!policy.active, "Policy must be inactive to issue a refund");

        address policyHolder = policy.policyHolder;
        uint256 premiumRefund = policy.premium;
        policy.premium = 0;
        payable(policyHolder).transfer(premiumRefund);

        emit RefundIssued(_policyId, policyHolder);
    }

    function getCustomerPolicies(address _customer) public view onlyOwner returns (uint256[] memory) {
        return userPolicies[_customer];
    }

    function auditTrails() public view onlyOwner returns (uint256 totalPolicies, uint256 totalClaims) {
        return (policyCount, claimCount);
    }

    // =======================
    // User Functions
    // =======================

    function viewAvailablePolicies() public view returns (Policy[] memory) {
        Policy[] memory allPolicies = new Policy[](policyCount);
        for (uint256 i = 1; i <= policyCount; i++) {
            allPolicies[i - 1] = policies[i];
        }
        return allPolicies;
    }

    function purchasePolicy(uint256 _policyId) public payable {
        Policy storage policy = policies[_policyId];
        require(msg.value == policy.premium, "Incorrect premium amount");
        require(!policy.active, "Policy is already active");

        policy.policyHolder = msg.sender;
        policy.startTime = block.timestamp;
        policy.active = true;
        userPolicies[msg.sender].push(_policyId);

        emit PolicyPurchased(_policyId, msg.sender);
    }

    function submitClaim(uint256 _policyId, uint256 _claimAmount) public onlyPolicyHolder(_policyId) {
        Policy storage policy = policies[_policyId];
        require(policy.active, "Policy must be active to submit a claim");

        claimCount++;
        claims[claimCount] = Claim({
            id: claimCount,
            policyId: _policyId,
            claimant: msg.sender,
            status: ClaimStatus.Pending,
            claimAmount: _claimAmount,
            paidOut: false
        });

        emit ClaimSubmitted(claimCount, _policyId, msg.sender);
    }

    function getClaimStatus(uint256 _claimId) public view returns (ClaimStatus) {
        return claims[_claimId].status;
    }

    function renewPolicy(uint256 _policyId) public payable onlyPolicyHolder(_policyId) {
        Policy storage policy = policies[_policyId];
        require(policy.renewable, "Policy is not renewable");
        require(msg.value == policy.premium, "Incorrect renewal premium");

        policy.startTime = block.timestamp;
        policy.active = true;
    }

    function makePremiumPayment(uint256 _policyId) public payable onlyPolicyHolder(_policyId) {
        Policy storage policy = policies[_policyId];
        require(msg.value == policy.premium, "Incorrect premium amount");

        policy.startTime = block.timestamp;
        policy.active = true;
    }

    function requestRefund(uint256 _policyId) public onlyPolicyHolder(_policyId) {
        Policy storage policy = policies[_policyId];
        require(!policy.active, "Policy is still active");

        refundPolicy(_policyId);
    }

    // =======================
    // Utility Functions
    // =======================

    function renewalReminder(uint256 _policyId) public view onlyPolicyHolder(_policyId) returns (bool) {
        Policy storage policy = policies[_policyId];
        if (block.timestamp > policy.startTime + policy.duration - 1 days) {
            return true; // Reminder: Policy is due for renewal within 1 day
        }
        return false;
    }
}