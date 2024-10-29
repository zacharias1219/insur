// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Insurance{
    address public owner;

    event policyCreated(address creator, uint256 policyId, string name, string[] terms, uint256 amount);
    event policyPurchased(address buyer, uint256 policyId, uint256 payment, bool conditionsMet);
}