import { ethers } from "ethers";
import keccak256 from "keccak256";
import MerkleTree from "merkletreejs";
import { EthAddress } from "../../shared";
import merkleJson from "../../shared/merkle.json";

export function getLeaf(account: EthAddress, amount: number) {
  const normalizedAddress = ethers.utils.getAddress(account);
  return Buffer.from(
    ethers.utils
      .solidityKeccak256(["address", "uint256"], [normalizedAddress, amount])
      .slice(2),
    "hex"
  );
}

export class MerkleDrop {
  private static instance: MerkleDrop;
  tree: MerkleTree;

  constructor() {
    if (!merkleJson) {
      console.log(
        "Cannot instantiate MerkleDrop without generating the merkle tree first."
      );
    }
    const { leaves, ...options } = merkleJson.tree;
    this.tree = new MerkleTree(
      merkleJson.tree.leaves.map((leaf) => Buffer.from(leaf.data)),
      keccak256,
      {
        ...options,
        fillDefaultHash: options.fillDefaultHash ?? undefined,
      }
    );
  }

  public static getMerkleDrop(): MerkleDrop {
    if (!MerkleDrop.instance) {
      MerkleDrop.instance = new MerkleDrop();
    }

    return MerkleDrop.instance;
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
