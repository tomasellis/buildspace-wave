import hre from "hardhat";
import { ethers } from "hardhat";

const main = async () => {
  // Get two addresses
  const [owner, randomPerson] = await hre.ethers.getSigners();

  // Search for the waveContract constructor
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");

  // Deploy the contract with hardhat
  const waveContract = await waveContractFactory.deploy();

  // Simulate deployment
  await waveContract.deployed();

  console.log("Contract deployed to:", waveContract.address);
  console.log("Contract deployed by:", owner.address);

  // Create a variable to hold wave numbers
  let waveCount;

  // Use the original waveContract address to run the function
  waveCount = await waveContract.getTotalWaves();

  // Send a wave
  let waveTxn = await waveContract.wave("Yoyoyo, its J-man, wazuuuup!");
  await waveTxn.wait();

  // Get a random address
  const [_, randoPerson] = await ethers.getSigners();
  waveTxn = await waveContract
    .connect(randoPerson)
    .wave("Yoooooooo, how you doing J-man, this is G. Odd!");
  await waveTxn.wait();

  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);
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
