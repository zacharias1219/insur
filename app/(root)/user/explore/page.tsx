// pages/Explore.tsx
import React, { useState, useEffect } from 'react';
import PolicyCard from '@/components/user/explore/PolicyCard';
import { INSURANCE_CONTRACT } from '@/context/constants';
import { ethers } from 'ethers';

interface Policy {
  id: number;
  policyType: string;
  premium: string;
  coverageAmount: string;
  duration: number;
  renewable: boolean;
  active: boolean;
}

const Explore: React.FC = () => {
  const [policies, setPolicies] = useState<Policy[]>([]);

  const fetchPolicies = async () => {
    try {
      const contract = await INSURANCE_CONTRACT();
      if (!contract) throw new Error("Contract not found");

      const policyCount = await contract.policyCount();
      const policyPromises = [];

      for (let i = 1; i <= policyCount; i++) {
        const policyPromise = contract.policies(i);
        policyPromises.push(policyPromise);
      }

      const policyList = await Promise.all(policyPromises);
      const structuredPolicies = policyList.map((policy: any) => ({
        id: policy.id.toNumber(),
        policyType: policy.policyType,
        premium: ethers.utils.formatEther(policy.premium),
        coverageAmount: ethers.utils.formatEther(policy.coverageAmount),
        duration: policy.duration.toNumber(),
        renewable: policy.renewable,
        active: policy.active,
      }));

      setPolicies(structuredPolicies);
    } catch (error) {
      console.error("Error fetching policies:", error);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  return (
    <div className="p-4">
      <div>
        <h1 className="text-3xl font-bold">Explore Policies</h1>
        <hr />
      </div>

      {/* Display each policy */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {policies.map((policy) => (
          <PolicyCard key={policy.id} policy={policy} />
        ))}
      </div>
    </div>
  );
};

export default Explore;
