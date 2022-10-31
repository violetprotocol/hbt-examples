import { isDevelopment } from "../utils/environments";
import { MockHBT__factory } from "../typechain-types";
import {
  EthAddress,
  Web3ChainReference,
  humanboundContracts,
} from "../../shared";
import { ethers } from "ethers";

export const getHBTId = async (address: EthAddress): Promise<null | string> => {
  if (isDevelopment()) {
    var url = "http://localhost:8545";
    var customProvider = ethers.providers.getDefaultProvider(url);
    await customProvider.ready;
    const mockHBT = await MockHBT__factory.connect(
      humanboundContracts[Web3ChainReference.EIP155_HARDHAT_LOCAL].address,
      customProvider
    );
    console.log("address", address);
    const balance = await mockHBT.balanceOf(address);

    if (!balance.gt(0)) {
      return null;
    }

    const topics = mockHBT.filters.Transfer(
      ethers.constants.AddressZero,
      address
    ).topics;

    const eventFilter = {
      address: mockHBT.address,
      topics,
      toBlock: "latest",
    };
    const logs = await customProvider.getLogs(eventFilter);

    const parsedLogs = logs.map((log) => mockHBT.interface.parseLog(log));

    if (parsedLogs.length == 0) {
      throw new Error("Cannot retrieve HBT ID: Failed to fetch logs");
    }
    const lastLog = parsedLogs.pop();

    const tokenId = lastLog?.args.tokenId.toString();
    if (!tokenId) {
      throw new Error("Cannot retrieve HBT ID: Missing token ID in log");
    }

    return tokenId;
  }
  // TODO: Verify on all networks with Alchemy
  return null;
};
