import { EthAddress } from "../../shared/types";
import airdropConfig from "../config/airdropConfig";

const isEntitledToMoreThanMinimum = (
  address: EthAddress
): address is keyof typeof airdropConfig.pastUsers =>
  address in airdropConfig.pastUsers;

export const getEligibility = (
  address: string
): { isEligible: boolean; tokenAmount: number } => {
  if (!isEntitledToMoreThanMinimum(address)) {
    // return the minimum amount
    return { isEligible: true, tokenAmount: airdropConfig.minAmount };
  }

  const amount = airdropConfig.pastUsers[address];

  return { isEligible: true, tokenAmount: amount };
};
