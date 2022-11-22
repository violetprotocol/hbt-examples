import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { MockHBT } from "../../src/types";

task("hbt:mint")
  .addParam("address", "Address of HBT contract")
  .addParam("recipient", "Recipient of HBT")
  .addParam("id", "Token ID of HBT")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const contract = <MockHBT>await ethers.getContractAt("MockHBT", taskArguments.address);
    const tx = await contract.safeMint(taskArguments.recipient, taskArguments.id);
    await tx.wait();

    console.log(`HBT ${taskArguments.id} minted to: ${taskArguments.recipient}`);
  });
