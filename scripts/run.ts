import hre from "hardhat";
import { ethers } from "hardhat";

const main = async () => {
  // Get two addresses
  const [owner, randomPerson] = await hre.ethers.getSigners();

  // Search for the waveContract constructor
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");

  // Deploy the contract with hardhat and fund it with 0.1 ether
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });

  // Simulate deployment
  await waveContract.deployed();

  console.log("Contract deployed to:", waveContract.address);
  console.log("Contract deployed by:", owner.address);

  // Get contract balance
  let contractBalance = await hre.ethers.provider.getBalance(
    waveContract.address
  );

  console.log(
    "The contracts balance is:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  // Send a wave
  let waveTxn = await waveContract.wave("Yoyoyo, its J-man, wazuuuup!");
  await waveTxn.wait();

  // Check the updated balance
  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let allWaves = await waveContract.getAllWaves();
  console.log("Here are all the waves ====>", allWaves);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
