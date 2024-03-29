import { Signer } from "ethers";
import { BACKEND_ENDPOINTS } from "src/config/endpoints";
import { displayToast } from "src/utils/toast";
import { getRegistrationMessage } from "../../../shared/config/registrationMessage";
import {
  BackendErrors,
  EthAddress,
  MerkleDetails,
  Registration,
} from "../../../shared/types";

export type RegisterAddressParams = {
  addressToRegister: string;
  signer: Signer;
};

export const registerAddress = async ({
  addressToRegister,
  signer,
}: RegisterAddressParams) => {
  const msg = getRegistrationMessage(addressToRegister);
  // const hash = await ethers.utils.keccak256(msg);
  const signature = await signer.signMessage(msg);

  return fetch(BACKEND_ENDPOINTS.register, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      addressToRegister,
      signature,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.registeredAddress) {
        return data.registeredAddress;
      }
      if (data?.error) {
        console.error("Error during registration", data);
        switch (data.error) {
          case BackendErrors.NOT_SIGNED_IN:
            displayToast(
              "Your Sign-In With Ethereum session expired. Please sign-in again."
            );
            return;
          case BackendErrors.INVALID_SIGNATURE_PROVIDED:
            displayToast(
              "The signature provided to sign-in with the address holding an HBT was invalid."
            );
            return;
          case BackendErrors.NOT_AN_HBT_OWNER:
            displayToast(
              "The address you used to sign-in does not own an HBT."
            );
            return;
          case BackendErrors.QUOTA_REACHED:
            displayToast(
              "Quota reached: You cannot register another address for the airdrop"
            );
            return;
          default:
            displayToast("Oooops, something went wrong!");
            break;
        }
        return;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const isAddressRegistered = async (
  address: EthAddress
): Promise<Registration> => {
  return fetch(BACKEND_ENDPOINTS.isRegistered(address), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error querying if address is registered:", error);
    });
};

export const fetchMerkleDetails = async (
  address: EthAddress,
  amount: number
): Promise<MerkleDetails> => {
  return fetch(BACKEND_ENDPOINTS.merkleDetails, {
    method: "POST",
    body: JSON.stringify({
      address,
      amount,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error("Error querying merkle details:", error);
    });
};