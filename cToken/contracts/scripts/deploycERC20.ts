// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import hre from "hardhat";

const HBTAddress = "";

async function main() {
  // We get the contract to deploy
  const CERC20 = await hre.ethers.getContractFactory("cERC20");
  const cERC20 = await CERC20.deploy("Test cToken", "cERC20", HBTAddress);

  await cERC20.deployed();

  console.log("cERC20 Token deployed to:", cERC20.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
