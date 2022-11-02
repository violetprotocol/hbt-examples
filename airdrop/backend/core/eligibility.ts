import { EthAddress } from "../../shared/types";
import airdropConfig from "../config/airdropConfig";

const isEntitledToMoreThanMinimum = (
  address: EthAddress
): address is keyof typeof airdropConfig.activeAccounts =>
  address in airdropConfig.activeAccounts;

export const getEligibility = (
  address: string
): { isEligible: boolean; tokenAmount: number } => {
  if (!isEntitledToMoreThanMinimum(address)) {
    return { isEligible: true, tokenAmount: airdropConfig.minAmount };
  }

  const amount = airdropConfig.activeAccounts[address];

  return { isEligible: true, tokenAmount: amount };
};
