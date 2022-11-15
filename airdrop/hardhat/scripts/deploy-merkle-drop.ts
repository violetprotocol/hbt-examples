// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import hre from "hardhat";
import merkleTree from "../../shared/merkle.json";

const TOKEN_NAME = "Aidropped Token";
const TOKEN_SYMBOL = "EXAMPLE";

async function main() {
  if (!merkleTree || !merkleTree.root) {
    throw new Error(
      "Cannot find merkle root. Please use merkle-tree-generator first to generate the merkle tree."
    );
  }
  // We get the contract to deploy
  const MerkleDrop = await hre.ethers.getContractFactory("ERC20MerkleDrop");
  const merkleDrop = await MerkleDrop.deploy(
    TOKEN_NAME,
    TOKEN_SYMBOL,
    merkleTree.root
  );

  await merkleDrop.deployed();

  console.log("Merkle Drop deployed to:", merkleDrop.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
