import { EthAddress } from "../../shared/types";
import airdropConfig from "../config/airdropConfig";
import eligibleAddresses from "../config/airdropConfig";

const isEligibleAddress = (
  address: EthAddress
): address is keyof typeof eligibleAddresses.airdrop =>
  address in eligibleAddresses.airdrop;

export const getEligibility = (
  address: string
): { isEligible: boolean; tokenAmount: number } => {
  if (!isEligibleAddress(address)) {
    return { isEligible: false, tokenAmount: 10 };
  }

  const amount = eligibleAddresses.airdrop[address];

  return { isEligible: true, tokenAmount: airdropConfig.minAmount };
};
