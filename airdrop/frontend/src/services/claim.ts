import { ERC20MerkleDrop } from "lib/typechain-types";
import { EthAddress } from "../../../shared";

export const hasAddressClaimed = async (
  contract: ERC20MerkleDrop,
  addressToVerify: EthAddress
): Promise<boolean | null> => {
  if (!contract) return null;

  const topics = contract.filters.Claimed(addressToVerify).topics;

  const eventFilter = {
    address: contract.address,
    topics,
    // TODO: Better to specify fromBlock per network
    // 0 works well locally but is asking for too much on mainnet for example
    fromBlock: contract?.deployTransaction?.blockNumber || 0,
    toBlock: "latest",
  };
  const logs = await contract.provider.getLogs(eventFilter);

  const parsedLogs = logs.map((log) => contract.interface.parseLog(log));

  if (parsedLogs.length == 0) {
    return false;
  }

  return true;
};
