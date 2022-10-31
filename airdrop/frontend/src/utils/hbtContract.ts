import { ethers, Signer } from "ethers";
import { MockHBT, MockHBT__factory } from "lib/typechain-types";
import { displayToast } from "./toast";

export type GetHBTContractParams = {
  chainId: number;
  signer: Signer;
};

export const getHBTContract = async ({
  chainId,
  signer,
}: GetHBTContractParams) => {
  let contractAddress: string;
  switch (chainId) {
    case 1: // Mainnet
      contractAddress = "";
      break;
    case 137: // Polygon Mainnet
      contractAddress = "";
      break;
    case 1337: // hardhat local
      contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      break;
    default:
      contractAddress = "";
  }

  if (!contractAddress) {
    throw new Error("Unsupported network");
  }

  if (!signer.provider) {
    throw new Error("Signer has no provider");
  }

  let code;
  try {
    code = await signer.provider.getCode(contractAddress, "latest");
    if (code == "0x") {
      console.error(
        `There is no code at ${contractAddress}. Please verify that the HBT contract was deployed at this address.`
      );
      displayToast(
        "The HBT contract address provided does not correspond to a smart contract.",
        {
          type: "error",
        }
      );
    }
  } catch (error) {
    console.log("error", error);
  }

  const contract = new ethers.Contract(
    contractAddress,
    MockHBT__factory.abi,
    signer
  ) as MockHBT;

  return contract;
};
