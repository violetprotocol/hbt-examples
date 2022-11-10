import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { MockHBT, MockHBT__factory } from "../../src/types";

task("deploy:hbt").setAction(async function (taskArguments: TaskArguments, { ethers }) {
  const factory = <MockHBT__factory>await ethers.getContractFactory("MockHBT");
  const contract = <MockHBT>await factory.deploy();

  await contract.deployed();

  console.log(`MockHBT deployed to: ${contract.address}`);
});
