import { Signer } from "ethers";
import { EthAddress } from "../../../shared";
import { displayToast } from "./toast";

export const generateRandomTokenId = () => {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
};

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function hasClaimingPeriodStarted() {
  return process.env.NEXT_PUBLIC_CLAIMING_PERIOD_STARTED === "true";
}

export const formatToDisplayEthAddress = (address: EthAddress): string =>
  `${address.substring(0, 8)}...${address.substring(37, 42)}`;

export const verifyAddressIsASmartContract = async (
  contractAddress: string,
  signer: Signer
) => {
  let code;
  try {
    if (!signer?.provider) throw new Error("Signer has no provider");

    code = await signer.provider.getCode(contractAddress, "latest");
    if (code == "0x") {
      console.error(
        `There is no code at ${contractAddress}. Please verify that a smart contract was deployed at this address.`
      );
      displayToast(
        "The contract address provided does not correspond to a smart contract.",
        {
          type: "error",
        }
      );
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log("error", error);
  }
};
