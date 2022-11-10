import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import "chai";
import { expect } from "chai";
import { ethers } from "hardhat";

import { CERC20, MockHBT } from "../src/types/contracts";
import { CERC20__factory, MockHBT__factory } from "../src/types/factories/contracts";

describe("cERC20", function () {
  const oneEther = ethers.utils.parseEther("1");
  const tokenName = "Compliant ERC20";
  const tokenSymbol = "cERC20";
  const hbtId = 42;
  const amount = 10;

  let owner: SignerWithAddress,
    user: SignerWithAddress,
    other: SignerWithAddress,
    spender: SignerWithAddress,
    mockHBT: MockHBT,
    cERC20: CERC20;

  beforeEach(async function () {
    [owner, user, other, spender] = await ethers.getSigners();
    const MockHBTFactory = new MockHBT__factory(owner);
    const CERC20Factory = new CERC20__factory(owner);
    mockHBT = await MockHBTFactory.deploy();
    cERC20 = await CERC20Factory.deploy(tokenName, tokenSymbol, mockHBT.address);
  });

  it("should be deployed correctly", async () => {
    expect(await cERC20.callStatic.name()).to.equal(tokenName);
    expect(await cERC20.callStatic.symbol()).to.equal(tokenSymbol);
  });

  describe("mint", () => {
    context("as owner", () => {
      context("to recipient with HBT", () => {
        beforeEach(async () => {
          await mockHBT.safeMint(user.address, hbtId);
          expect(await mockHBT.callStatic.ownerOf(hbtId)).to.equal(user.address);
        });

        it("should mint successfully", async () => {
          await expect(cERC20.connect(owner).mint(user.address, amount)).to.not.be.reverted;
          expect(await cERC20.callStatic.balanceOf(user.address)).to.equal(amount);
        });
      });

      context("to recipient without HBT", () => {
        it("should fail to mint", async () => {
          await expect(cERC20.connect(owner).mint(user.address, amount)).to.be.revertedWith(
            "cERC20: account is not humanbound token holder",
          );
          expect(await cERC20.callStatic.balanceOf(user.address)).to.equal(0);
        });
      });
    });

    context("as non-owner", () => {
      context("to recipient with HBT", () => {
        beforeEach(async () => {
          await mockHBT.safeMint(user.address, hbtId);
          expect(await mockHBT.callStatic.ownerOf(hbtId)).to.equal(user.address);
        });

        it("should fail to mint", async () => {
          await expect(cERC20.connect(user).mint(user.address, amount)).to.be.revertedWith(
            "Ownable: caller is not the owner",
          );
          expect(await cERC20.callStatic.balanceOf(user.address)).to.equal(0);
        });
      });

      context("to recipient without HBT", () => {
        it("should fail to mint", async () => {
          await expect(cERC20.connect(user).mint(user.address, amount)).to.be.revertedWith(
            "Ownable: caller is not the owner",
          );
          expect(await cERC20.callStatic.balanceOf(user.address)).to.equal(0);
        });
      });
    });
  });

  describe("transfer", () => {
    context("as token owner", () => {
      context("with HBT", () => {
        beforeEach(async () => {
          await mockHBT.safeMint(user.address, hbtId);
          expect(await mockHBT.callStatic.ownerOf(hbtId)).to.equal(user.address);
        });

        context("with minted tokens", () => {
          beforeEach(async () => {
            await cERC20.connect(owner).mint(user.address, amount);
            expect(await cERC20.callStatic.balanceOf(user.address)).to.equal(amount);
          });

          context("to recipient with HBT", () => {
            beforeEach(async () => {
              await mockHBT.safeMint(other.address, hbtId + 1);
              expect(await mockHBT.callStatic.ownerOf(hbtId + 1)).to.equal(other.address);
            });

            it("should transfer successfully", async () => {
              await expect(cERC20.connect(user).transfer(other.address, amount)).to.not.be.reverted;
              expect(await cERC20.callStatic.balanceOf(user.address)).to.equal(0);
              expect(await cERC20.callStatic.balanceOf(other.address)).to.equal(amount);
            });
          });

          context("to recipient without HBT", () => {
            it("should fail to transfer", async () => {
              await expect(cERC20.connect(user).transfer(other.address, amount)).to.be.revertedWith(
                "cERC20: account is not humanbound token holder",
              );
              expect(await cERC20.callStatic.balanceOf(user.address)).to.equal(amount);
              expect(await cERC20.callStatic.balanceOf(other.address)).to.equal(0);
            });
          });
        });
      });

      context("without HBT", () => {
        context("with minted tokens", () => {
          beforeEach(async () => {
            await mockHBT.safeMint(user.address, hbtId);
            expect(await mockHBT.callStatic.ownerOf(hbtId)).to.equal(user.address);

            await cERC20.connect(owner).mint(user.address, amount);
            expect(await cERC20.callStatic.balanceOf(user.address)).to.equal(amount);

            await mockHBT.burn(hbtId);
            await expect(mockHBT.ownerOf(hbtId)).to.be.revertedWith("ERC721: invalid token ID");
          });

          context("to recipient with HBT", () => {
            beforeEach(async () => {
              await mockHBT.safeMint(other.address, hbtId + 1);
              expect(await mockHBT.callStatic.ownerOf(hbtId + 1)).to.equal(other.address);
            });

            it("should fail to transfer", async () => {
              await expect(cERC20.connect(user).transfer(other.address, amount)).to.be.revertedWith(
                "cERC20: account is not humanbound token holder",
              );
              expect(await cERC20.callStatic.balanceOf(user.address)).to.equal(amount);
              expect(await cERC20.callStatic.balanceOf(other.address)).to.equal(0);
            });
          });

          context("to recipient without HBT", () => {
            it("should fail to transfer", async () => {
              await expect(cERC20.connect(user).transfer(other.address, amount)).to.be.revertedWith(
                "cERC20: account is not humanbound token holder",
              );
              expect(await cERC20.callStatic.balanceOf(user.address)).to.equal(amount);
              expect(await cERC20.callStatic.balanceOf(other.address)).to.equal(0);
            });
          });
        });
      });
    });

    context("as approved spender", () => {
      beforeEach(async () => {
        await mockHBT.safeMint(user.address, hbtId);
        expect(await mockHBT.callStatic.ownerOf(hbtId)).to.equal(user.address);

        await cERC20.connect(owner).mint(user.address, amount);
        expect(await cERC20.callStatic.balanceOf(user.address)).to.equal(amount);

        await cERC20.connect(user).approve(spender.address, amount);
      });

      context("to recipient with HBT", () => {
        beforeEach(async () => {
          await mockHBT.safeMint(other.address, hbtId + 1);
          expect(await mockHBT.callStatic.ownerOf(hbtId + 1)).to.equal(other.address);
        });

        it("should transfer successfully", async () => {
          await expect(cERC20.connect(spender).transferFrom(user.address, other.address, amount)).to.not.be.reverted;
          expect(await cERC20.callStatic.balanceOf(user.address)).to.equal(0);
          expect(await cERC20.callStatic.balanceOf(other.address)).to.equal(amount);
        });
      });

      context("to recipient without HBT", () => {
        it("should fail to transfer", async () => {
          await expect(cERC20.connect(spender).transferFrom(user.address, other.address, amount)).to.be.revertedWith(
            "cERC20: account is not humanbound token holder",
          );
          expect(await cERC20.callStatic.balanceOf(user.address)).to.equal(amount);
          expect(await cERC20.callStatic.balanceOf(other.address)).to.equal(0);
        });
      });
    });
  });
});
