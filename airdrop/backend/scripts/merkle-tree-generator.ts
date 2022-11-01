import { ethers } from "ethers";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import fs from "fs";
import path from "path";
import { parseUnits } from "ethers/lib/utils";
import mongoose from "mongoose";
import airdropConfig from "../config/airdropConfig";
import claimRepository from "../repositories/claim.repository";
import { EthAddress } from "../../shared";

mongoose
  .connect("mongodb://localhost:27017/hbt-airdrop")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("FAILED to connect to MongoDB: " + err));

// Output file path
const outputPath: string = path.join(__dirname, "../../hardhat/merkle.json");

// Object containing the list of addresses and how much tokens they can claim
// { "0x2fe4" : 562, ...}
type Entries = Record<EthAddress, number>;

/**
 * Throws error and exists process
 * @param {string} erorr to log
 */
function logErrorAndExit(error: Error): void {
  console.error(error);
  process.exit(1);
}

const generateMerkleTree = async () => {
  // Check if config contains airdrop key
  if (airdropConfig["decimals"] === undefined) {
    logErrorAndExit(new Error("Missing decimals param in config. Please add."));
  }

  // Collect config
  const decimals: number = airdropConfig.decimals ?? 18;
  const allClaims = await claimRepository.find({});
  console.log("Retrieved ", allClaims.length, " addresses from the database.");
  const entries: Entries = await allClaims.reduce(
    (prev, current) => ({ ...prev, [current.address]: current.amount }),
    {}
  );

  // Generate
  await generate(decimals, entries);
};

const generate = async (decimals: number, entries: Entries) => {
  const merkleTree = new MerkleTree(
    Object.entries(entries).map(([address, amount]) =>
      getLeaf(address, parseUnits(amount.toString(), decimals).toString())
    ),
    keccak256,
    { sortPairs: true }
  );

  const merkleRoot: string = merkleTree.getHexRoot();
  console.log(`Generated Merkle root: ${merkleRoot}`);

  // Collect and save merkle tree + root
  await fs.writeFileSync(
    // Output to merkle.json
    outputPath,
    // Root + full tree
    JSON.stringify({
      root: merkleRoot,
      tree: merkleTree,
    })
  );
  console.info("Generated merkle tree and root saved to merkle.json.");
};

function getLeaf(account: string, amount: string) {
  return Buffer.from(
    ethers.utils
      .solidityKeccak256(["address", "uint256"], [account, amount])
      .slice(2),
    "hex"
  );
}

generateMerkleTree()
  .then(() => process.exit(0))
  .catch(logErrorAndExit);
