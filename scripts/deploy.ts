// Import ethers from Hardhat package
import { ethers } from "hardhat";

/* 
OrderBook deployed to: 0xD1F41537104Aa8C0841d10Dd72eaC3F9E6F1B300
*/

const USDC_ADDRESS = "0x5a800d7e1e1C22C3a72b51AE8535B52ccBB72bC5"; // Replace with the actual USDC contract address

async function main() {
  // This script expects the USDC address to be provided
  // For example purposes, this could be a dummy address

  // Fetch the Contract Factory for the OrderBook contract
  const OrderBook = await ethers.getContractFactory("OrderBook");

  // Deploy the contract
  const orderBook = await OrderBook.deploy(USDC_ADDRESS);

  // Wait for the deployment to be mined
  await orderBook.waitForDeployment();

  // Log the address of the deployed contract
  console.log("OrderBook deployed to:", await orderBook.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
