import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { CERC20 } from "../../src/types";

task("cerc20:mint")
  .addParam("address", "Address of CERC20 contract")
  .addParam("recipient", "Recipient of CERC20 tokens")
  .addParam("amount", "Amount of CERC20 to mint")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const contract = <CERC20>await ethers.getContractAt("CERC20", taskArguments.address);
    const tx = await contract.mint(taskArguments.recipient, taskArguments.amount);
    await tx.wait();

    console.log(`${taskArguments.amount} CERC20 minted to: ${taskArguments.recipient}`);
  });
