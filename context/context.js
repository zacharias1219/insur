import { INSURANCE_CONTRACT, connectWallet, checkIfWalletIsConnected } from "./constants";

export const initializeWallet = async () => {
  try {
    const account = await checkIfWalletIsConnected();
    if (!account) return await connectWallet();
    return account;
  } catch (error) {
    console.error("Error initializing wallet:", error);
  }
};

export const createPolicy = async (policyType, premium, payoutAmount, duration) => {
  try {
    const contract = await INSURANCE_CONTRACT();
    const tx = await contract.createPolicy(policyType, premium, payoutAmount, duration);
    await tx.wait();
    console.log("Policy created successfully:", tx);
  } catch (error) {
    console.error("Error creating policy:", error);
  }
};

export const purchasePolicy = async (policyId, premiumAmount) => {
  try {
    const contract = await INSURANCE_CONTRACT();
    const tx = await contract.purchasePolicy(policyId, { value: premiumAmount });
    await tx.wait();
    console.log("Policy purchased successfully:", tx);
  } catch (error) {
    console.error("Error purchasing policy:", error);
  }
};

export const submitClaim = async (policyId) => {
  try {
    const contract = await INSURANCE_CONTRACT();
    const tx = await contract.submitClaim(policyId);
    await tx.wait();
    console.log("Claim submitted successfully:", tx);
  } catch (error) {
    console.error("Error submitting claim:", error);
  }
};

export const verifyClaim = async (claimId, approval) => {
  try {
    const contract = await INSURANCE_CONTRACT();
    const tx = await contract.verifyClaim(claimId, approval);
    await tx.wait();
    console.log("Claim verified successfully:", tx);
  } catch (error) {
    console.error("Error verifying claim:", error);
  }
};

export const refundDeactivatedPolicy = async (policyId) => {
  try {
    const contract = await INSURANCE_CONTRACT();
    const tx = await contract.refundDeactivatedPolicy(policyId);
    await tx.wait();
    console.log("Policy refunded successfully:", tx);
  } catch (error) {
    console.error("Error refunding policy:", error);
  }
};

export const getPolicyDetails = async (policyId) => {
  try {
    const contract = await INSURANCE_CONTRACT();
    const policy = await contract.getPolicyDetails(policyId);
    console.log("Policy Details:", policy);
    return policy;
  } catch (error) {
    console.error("Error fetching policy details:", error);
  }
};
