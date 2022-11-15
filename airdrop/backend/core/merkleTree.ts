import { ethers } from "ethers";
import keccak256 from "keccak256";
import MerkleTree from "merkletreejs";
import fs from "fs";
import { EthAddress, MerkleDetails } from "../../shared";
import { sharedConfig } from "../../shared/config/sharedConfig";
import merkleDumpConfig from "../config/merkleDumpConfig";

export function getLeaf(account: EthAddress, amount: number) {
  const normalizedAddress = ethers.utils.getAddress(account);
  const normalizedAmount = ethers.utils.parseUnits(
    amount.toString(),
    sharedConfig.decimals
  );
  return Buffer.from(
    ethers.utils
      .solidityKeccak256(
        ["address", "uint256"],
        [normalizedAddress, normalizedAmount]
      )
      .slice(2),
    "hex"
  );
}

export class MerkleDrop {
  merkleJson: any;
  tree: MerkleTree;

  constructor(merkleDump: Record<string, any>) {
    const { leaves, ...options } = merkleDump.tree;
    // Construct a MerkleTree instance from the merkleDump
    this.tree = new MerkleTree(
      merkleDump.tree.leaves.map((leaf: any) => Buffer.from(leaf.data)),
      keccak256,
      {
        ...options,
        fillDefaultHash: options.fillDefaultHash ?? undefined,
      }
    );
  }

  getHexProof(leaf: string | Buffer, index?: number | undefined) {
    return this.tree.getHexProof(leaf, index);
  }

  getLeafIndex(leaf: Buffer) {
    return this.tree.getLeafIndex(leaf);
  }

  getMerkleDetails(account: EthAddress, amount: number) {
    const leaf = getLeaf(account, amount);

    const index = this.getLeafIndex(leaf);

    const proof = this.getHexProof(leaf, index);

    return { leaf, proof, index };
  }

  verifyProof(proof: any[], leaf: string | Buffer) {
    const root = this.tree.getRoot();

    return this.tree.verify(proof, leaf, root);
  }
}

let merkleDrop: MerkleDrop;

export const getMerkleDrop = () => {
  if (!merkleDrop) {
    let merkleJsonFile;
    try {
      merkleJsonFile = fs.readFileSync(merkleDumpConfig.outputPath);
    } catch (error) {
      console.error("Fail to load json dump of merkle tree.");
      throw error;
    }

    const merkleDump = JSON.parse(merkleJsonFile.toString());
    if (!merkleDump) {
      throw new Error("Cannot initialize MerkleDrop");
    }
    return new MerkleDrop(merkleDump);
  }

  return merkleDrop;
};

// Given an address and amount, returns the "merkle details" (proof, leaf and index)
export const getMerkleDetails = (
  address: EthAddress,
  amount: number
): MerkleDetails => {
  const merkleDrop = getMerkleDrop();
  if (!merkleDrop) {
    throw new Error("Failed to get Merkle Drop");
  }

  const merkleDetails = merkleDrop.getMerkleDetails(address, amount);

  const isValidProof = merkleDrop.verifyProof(
    merkleDetails.proof,
    merkleDetails.leaf
  );

  if (!isValidProof) {
    throw new Error(`Invalid proof found for ${address} (amount: ${amount}).`);
  }

  return merkleDetails;
};