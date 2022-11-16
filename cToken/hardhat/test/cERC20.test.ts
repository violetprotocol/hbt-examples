import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import "chai";
import { expect } from "chai";
import { ethers } from "hardhat";

import { CERC20, MockHBT } from "../src/types/contracts";
import { MockERC20 } from "../src/types/contracts/MockERC20";
import { CERC20__factory, MockHBT__factory } from "../src/types/factories/contracts";
import { MockERC20__factory } from "../src/types/factories/contracts/MockERC20__factory";

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
    mockERC20: MockERC20,
    cERC20: CERC20;

  beforeEach(async function () {
    [owner, user, other, spender] = await ethers.getSigners();
    const MockHBTFactory = new MockHBT__factory(owner);
    const ERC20Factory = new MockERC20__factory(owner);
    const CERC20Factory = new CERC20__factory(owner);
    mockHBT = await MockHBTFactory.deploy();
    mockERC20 = await ERC20Factory.deploy("ERC20", "ERC20");
    cERC20 = await CERC20Factory.deploy(tokenName, tokenSymbol, mockHBT.address, mockERC20.address);
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

  describe("wrap", () => {
    context("uncompliant token", () => {
      beforeEach(async () => {
        await expect(mockERC20.mint(user.address, 10)).to.not.be.reverted;
        expect(await mockERC20.balanceOf(user.address)).to.equal(amount);
        await mockERC20.connect(user).approve(cERC20.address, ethers.constants.MaxUint256);

        await expect(mockERC20.mint(other.address, 10)).to.not.be.reverted;
        expect(await mockERC20.balanceOf(other.address)).to.equal(amount);
        await mockERC20.connect(other).approve(cERC20.address, ethers.constants.MaxUint256);
      });

      context("from hbt owner", () => {
        beforeEach(async () => {
          await mockHBT.safeMint(user.address, hbtId);
          expect(await mockHBT.callStatic.ownerOf(hbtId)).to.equal(user.address);
        });

        it("should successfully wrap", async () => {
          await expect(cERC20.connect(user).wrap(amount)).to.not.be.reverted;

          expect(await cERC20.callStatic.balanceOf(user.address)).to.equal(amount);
          expect(await mockERC20.callStatic.balanceOf(user.address)).to.equal(0);
        });

        it("should fail to wrap with not enough funds", async () => {
          await expect(cERC20.connect(user).wrap(amount + 1)).to.be.revertedWith(
            "ERC20: transfer amount exceeds balance",
          );
        });
      });

      context("from non-hbt owner", () => {
        it("should fail to wrap", async () => {
          await expect(cERC20.connect(other).wrap(amount)).to.be.revertedWith(
            "cERC20: account is not humanbound token holder",
          );
        });
      });
    });
  });

  describe("unwrap", () => {
    context("wrapped tokens", () => {
      beforeEach(async () => {
        await expect(mockERC20.mint(user.address, 10)).to.not.be.reverted;

        await expect(mockHBT.safeMint(user.address, hbtId)).to.not.be.reverted;

        await mockERC20.connect(user).approve(cERC20.address, ethers.constants.MaxUint256);
        await expect(cERC20.connect(user).wrap(amount)).to.not.be.reverted;
      });

      context("from hbt owner", () => {
        it("should successfully unwrap", async () => {
          await expect(cERC20.connect(user).unwrap(amount)).to.not.be.reverted;

          expect(await cERC20.callStatic.balanceOf(user.address)).to.equal(0);
          expect(await mockERC20.callStatic.balanceOf(user.address)).to.equal(amount);
        });
      });

      context("from non-hbt owner", () => {
        beforeEach(async () => {
          await expect(mockHBT.burn(hbtId)).to.not.be.reverted;
        });

        it("should fail to unwrap", async () => {
          await expect(cERC20.connect(user).unwrap(amount)).to.be.revertedWith(
            "cERC20: account is not humanbound token holder",
          );

          expect(await cERC20.callStatic.balanceOf(user.address)).to.equal(amount);
          expect(await mockERC20.callStatic.balanceOf(user.address)).to.equal(0);
        });
      });
    });
  });
});
