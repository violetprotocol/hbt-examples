import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { CERC20, CERC20__factory } from "../../src/types";

task("deploy:cerc20")
  .addParam("name", "Name of cERC20 token")
  .addParam("symbol", "Symbol of cERC20 token")
  .addParam("hbt", "Address of HBT contract")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const factory = <CERC20__factory>await ethers.getContractFactory("cERC20");
    const contract = <CERC20>await factory.deploy(taskArguments.name, taskArguments.symbol, taskArguments.hbt);

    await contract.deployed();

    console.log(`cERC20 Token deployed to: ${contract.address}`);
  });
