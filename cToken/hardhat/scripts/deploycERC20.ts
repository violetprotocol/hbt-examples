// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import hre from "hardhat";

const HBTAddress = "0x8d39Fe83eD158F1B7e21A6434e0878D6c11F02B9";
const ERC20Address = "0x880058Ba98E914760545fedfe8C52a8EAb3054Ab";
const premintERC20 = 1000000;

async function main() {
  // We get the contract to deploy
  const CERC20 = await hre.ethers.getContractFactory("cERC20");
  const cERC20 = await CERC20.deploy("Test cToken", "cERC20", HBTAddress, ERC20Address);

  await cERC20.deployed();

  console.log("cERC20 Token deployed to:", cERC20.address);

  const signer = (await hre.ethers.getSigners())[0].address;

  // To enable smooth unwrapping flows, we will premint and prewrap tokens for demonstration purposes
  const ERC20 = await hre.ethers.getContractAt("MockERC20", ERC20Address);
  let tx = await ERC20.mint(signer, premintERC20);
  await tx.wait();

  const MockHBT = await hre.ethers.getContractAt("MockHBT", HBTAddress);
  tx = await MockHBT.safeMint(signer, 0);
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
