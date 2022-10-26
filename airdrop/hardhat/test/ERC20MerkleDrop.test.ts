import { ethers } from "hardhat";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { expect } from "chai";
import tokens from "./fixtureAddresses.json";
import { ERC20MerkleDrop__factory } from "../typechain-types/index";

async function deploy(name: string, symbol: string, hexRoot: string) {
  const [deployer] = await ethers.getSigners();
  const contractFactory = new ERC20MerkleDrop__factory(deployer);
  const contract = await contractFactory.deploy(name, symbol, hexRoot);
  return await contract.deployed();
}

function getLeaf(account: string, amount: number) {
  return Buffer.from(
    ethers.utils
      .solidityKeccak256(["address", "uint256"], [account, amount])
      .slice(2),
    "hex"
  );
}

describe("ERC20MerkleDrop", function () {
  before(async function () {
    this.accounts = await ethers.getSigners();
    this.merkleTree = new MerkleTree(
      Object.entries(tokens).map((token) => getLeaf(...token)),
      keccak256,
      { sortPairs: true }
    );
  });

  describe("Mint for all recipients", function () {
    before(async function () {
      this.registry = await deploy(
        "Name",
        "Symbol",
        this.merkleTree.getHexRoot()
      );
    });

    for (const [account, amount] of Object.entries(tokens)) {
      it("recipient", async function () {
        /**
         * Create merkle proof (anyone with knowledge of the merkle tree)
         */
        const proof = this.merkleTree.getHexProof(getLeaf(account, amount));
        /**
         * Redeems token using merkle proof (anyone with the proof)
         */
        await expect(this.registry.redeem(account, amount, proof))
          .to.emit(this.registry, "Transfer")
          .withArgs(ethers.constants.AddressZero, account, amount);
      });
    }
  });

  describe("Duplicate mint", function () {
    before(async function () {
      this.registry = await deploy(
        "Name",
        "Symbol",
        this.merkleTree.getHexRoot()
      );

      this.token = {};
      [this.token.account, this.token.amount] = Object.entries(tokens)[0];
      this.token.proof = this.merkleTree.getHexProof(
        getLeaf(this.token.account, this.token.amount)
      );
    });

    it("mint once - success", async function () {
      await expect(
        this.registry.redeem(
          this.token.account,
          this.token.amount,
          this.token.proof
        )
      )
        .to.emit(this.registry, "Transfer")
        .withArgs(
          ethers.constants.AddressZero,
          this.token.account,
          this.token.amount
        );
    });

    it("mint twice - failure", async function () {
      await expect(
        this.registry.redeem(
          this.token.account,
          this.token.amount,
          this.token.proof
        )
      ).to.be.revertedWith("ERC20MerkleDrop: Tokens already claimed");
    });
  });

  describe("proofs", function () {
    before(async function () {
      this.registry = await deploy(
        "Name",
        "Symbol",
        this.merkleTree.getHexRoot()
      );

      this.entry = {};
      [this.entry.account, this.entry.amount] = Object.entries(tokens)[1];
      this.entry.proof = this.merkleTree.getHexProof(
        getLeaf(this.entry.account, this.entry.amount)
      );
    });

    it("should guarantee the right recipient", async function () {
      const wrongAccount = this.accounts[4].address;
      await expect(
        this.registry.redeem(wrongAccount, this.entry.amount, this.entry.proof)
      ).to.be.revertedWith("ERC20MerkleDrop: Valid proof required");
    });

    it("should guarantee the right amount", async function () {
      const wrongAmount = this.entry.amount + 1;
      await expect(
        this.registry.redeem(this.entry.account, wrongAmount, this.entry.proof)
      ).to.be.revertedWith("ERC20MerkleDrop: Valid proof required");
    });
  });
});
