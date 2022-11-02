import { ethers, Signer } from "ethers";
import { MockHBT, MockHBT__factory } from "lib/typechain-types";
import { verifyAddressIsASmartContract } from ".";
import { humanboundContracts, Web3ChainReference } from "../../../shared";

export type GetHBTContractParams = {
  chainId: number;
  signer: Signer;
};

export const getHBTContract = async ({
  chainId,
  signer,
}: GetHBTContractParams) => {
  const contractAddress =
    humanboundContracts[chainId as Web3ChainReference]?.address;

  if (!contractAddress) {
    throw new Error("Unsupported network");
  }

  if (!signer.provider) {
    throw new Error("Signer has no provider");
  }

  const isContract = await verifyAddressIsASmartContract(
    contractAddress,
    signer
  );

  if (!isContract) return null;

  const contract = new ethers.Contract(
    contractAddress,
    MockHBT__factory.abi,
    signer
  ) as MockHBT;

  return contract;
};;
