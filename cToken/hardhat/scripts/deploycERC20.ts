// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import hre from "hardhat";

const HBTAddress = "0x581af8eaEa059cAA65A2652321aB7e2Cd3a4d423";
const ERC20Address = "0x99699724dDe872ae816Ce480775FDFce2D3fC9d4";
const premintERC20 = 1000000;

async function main() {
  // We get the contract to deploy
  const CERC20 = await hre.ethers.getContractFactory("cERC20");
  const cERC20 = await CERC20.deploy("Test cToken", "cERC20", HBTAddress, ERC20Address);

  await cERC20.deployed();

  console.log("cERC20 Token deployed to:", cERC20.address);

  // To enable smooth unwrapping flows, we will premint and prewrap tokens for demonstration purposes
  const ERC20 = await hre.ethers.getContractAt("MockERC20", ERC20Address);
  let tx = await ERC20.mint((await hre.ethers.getSigners())[0].address, premintERC20);
  await tx.wait();

  tx = await ERC20.approve(cERC20.address, premintERC20);
  await tx.wait();

  tx = await cERC20.wrap(premintERC20);
  await tx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
