import React from 'react';
import { ethers } from 'ethers';
import { purchasePolicy } from '@/context/context';

// Define types for Policy props
interface Policy {
  id: number;
  policyType: string;
  premium: string;
  coverageAmount: string;
  duration: number;
  renewable: boolean;
}

interface PolicyCardProps {
  policy: Policy;
}

const PolicyCard: React.FC<PolicyCardProps> = ({ policy }) => {
  const handlePurchase = async () => {
    try {
      // Convert premium to ethers format for the transaction
      const premiumAmount = ethers.utils.parseEther(policy.premium);
      await purchasePolicy(policy.id, premiumAmount);
      alert("Policy purchased successfully!");
    } catch (error) {
      console.error("Error purchasing policy:", error);
      alert("Failed to purchase policy.");
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h3 className="text-xl font-semibold">{policy.policyType}</h3>
      <p>Premium: {policy.premium} ETH</p>
      <p>Coverage Amount: {policy.coverageAmount} ETH</p>
      <p>Duration: {policy.duration} days</p>
      <p>Renewable: {policy.renewable ? "Yes" : "No"}</p>
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handlePurchase}
      >
        Purchase Policy
      </button>
    </div>
  );
};

export default PolicyCard;
