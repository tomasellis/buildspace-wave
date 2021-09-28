import hre from "hardhat";

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

  let waveTxn = await waveContract.wave();
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();

  // Use a random address to run the function
  waveTxn = await waveContract.connect(randomPerson).wave();
  await waveTxn.wait();

  waveCount = await waveContract.getTotalWaves();
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
