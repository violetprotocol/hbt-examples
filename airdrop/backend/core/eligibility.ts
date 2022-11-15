import { EthAddress } from "../../shared/types";
import { sharedConfig } from "../../shared/config/sharedConfig";

const isEntitledToMoreThanMinimum = (
  address: EthAddress
): address is keyof typeof sharedConfig.pastUsers =>
  address in sharedConfig.pastUsers;

export const getEligibility = (
  address: string
): { isEligible: boolean; tokenAmount: number } => {
  if (!isEntitledToMoreThanMinimum(address)) {
    // return the minimum amount
    return { isEligible: true, tokenAmount: sharedConfig.minAmount };
  }

  const amount = sharedConfig.pastUsers[address];

  return { isEligible: true, tokenAmount: amount };
};
