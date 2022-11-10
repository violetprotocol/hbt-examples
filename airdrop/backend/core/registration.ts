import { ethers } from "ethers";
import {
  BackendErrors,
  EthAddress,
  getRegistrationMessage,
  Registration,
  sharedConfig,
} from "../../shared";
import hbtRepository from "../repositories/hbt.repository";
import { getHBTId } from "./hbt";
import { getEligibility } from "./eligibility";
import { validateClaim } from "../models/claim";
import claimRepository from "../repositories/claim.repository";
import airdropConfig from "../config/airdropConfig";

export type RegisterResultSuccess = {
  registered: boolean;
  address: EthAddress;
};
export type RegisterResultError = { error: BackendErrors; message?: string };
export type RegisterResult = RegisterResultSuccess | RegisterResultError;

export const hasRegisterSucceeded = (
  result: RegisterResult
): result is RegisterResultSuccess =>
  !!(result as RegisterResultSuccess).registered;

export const register = async ({
  addressToRegister,
  signature,
  signedInAddress,
}: {
  addressToRegister: EthAddress;
  signature: string;
  signedInAddress: EthAddress;
}): Promise<RegisterResult> => {
  const normalizedAddress = ethers.utils.getAddress(addressToRegister);

  // 1. Verify signature for registered address
  const message = getRegistrationMessage(addressToRegister);
  const recoveredSigner = await ethers.utils.verifyMessage(message, signature);

  if (recoveredSigner != normalizedAddress) {
    return {
      error: BackendErrors.INVALID_SIGNATURE_PROVIDED,
      message: `Invalid signature provided for registering ${addressToRegister}`,
    };
  }

  // 2. Verify HBT ownership
  const hbtId = await getHBTId(signedInAddress);
  if (!hbtId) {
    return {
      error: BackendErrors.NOT_AN_HBT_OWNER,
      message: `Signed in address does not own an HBT`,
    };
  }

  // 3. Verify quota.
  // We check that the number of addresses registered for that HBT ID
  // is not already `maximumNumberOfAddressesOneCanRegister`.
  const hbt = await hbtRepository.findByHbtId({ hbtId });
  if (
    hbt &&
    hbt.numberOfRegisteredAddresses ===
      sharedConfig.maximumNumberOfAddressesOneCanRegister
  ) {
    return {
      error: BackendErrors.QUOTA_REACHED,
      message: `Maximum number of addresses registered and associated with that HBT reached.`,
    };
  }

  // 4. Increment the number of addresses that was registered for that HBT
  try {
    await hbtRepository.incrementNumberOfAddressesRegistered({ hbtId });
  } catch (error) {
    console.error(
      "Error while incrementing the number of registered addreses",
      error
    );
    return {
      error: BackendErrors.INTERNAL_ERROR,
    };
  }

  // 5. Register eligible address
  const eligibility = getEligibility(addressToRegister);
  const validationResult = validateClaim({
    address: addressToRegister,
    amount: eligibility.tokenAmount,
  });
  if (validationResult.error) {
    console.error("Error while validating claim", validationResult);
    return {
      error: BackendErrors.INTERNAL_ERROR,
    };
  }

  try {
    const claim = await claimRepository.create({
      address: addressToRegister,
      amount: eligibility.tokenAmount,
    });

    return {
      registered: true,
      address: claim.address,
    };
  } catch (error) {
    // Revert increment
    // TODO: handle if that fails too
    await hbtRepository.decrementNumberOfAddressesRegistered({ hbtId });

    console.error("Error while creating claim", error);

    return {
      error: BackendErrors.INTERNAL_ERROR,
    };
  }
};

export const getRegistration = async (
  address: EthAddress
): Promise<Registration> => {
  const claim = await claimRepository.findByAddress(address);

  if (!claim) {
    return { isRegistered: false, address };
  }
  const scaledAmount = ethers.utils
    .parseUnits(claim.amount.toString(), airdropConfig.decimals)
    .toString();

  return {
    isRegistered: true,
    address: claim.address,
    amount: claim.amount,
    scaledAmount,
  };
};
