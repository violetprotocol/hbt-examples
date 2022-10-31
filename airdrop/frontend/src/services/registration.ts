import { Signer } from "ethers";
import { BACKEND_ENDPOINTS } from "src/config/endpoints";
import { displayToast } from "src/utils/toast";
import { getRegistrationMessage } from "../../../shared/config/registrationMessage";
import { BackendErrors } from "../../../shared/types";

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
        if (data.error == BackendErrors.NOT_SIGNED_IN) {
          displayToast(
            "Your Sign-In With Ethereum session expired. Please sign-in again."
          );
        }
        return;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
