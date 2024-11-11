const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const InsurancePlatform = await hre.ethers.getContractFactory("Lock");
  const insurancePlatform = await InsurancePlatform.deploy();

  await insurancePlatform.deployed();

  console.log(`Lock contract deployed to: ${insurancePlatform.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})