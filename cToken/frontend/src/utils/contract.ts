import { ethers, Signer } from "ethers";
import {
  CERC20,
  CERC20__factory,
  MockERC20,
  MockERC20__factory,
  MockHBT,
  MockHBT__factory,
} from "lib";
import { verifyAddressIsASmartContract } from ".";
import {
  cERC20Contracts,
  humanboundContracts,
  MockERC20Contracts,
  Web3ChainReference,
} from "../shared";

export type GetContractParams = {
  chainId: number;
  signer: Signer;
};

export const getHBTContract = async ({
  chainId,
  signer,
}: GetContractParams) => {
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
};

export const getERC20Contract = async ({
  chainId,
  signer,
}: GetContractParams) => {
  const contractAddress =
    MockERC20Contracts[chainId as Web3ChainReference]?.address;

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
    MockERC20__factory.abi,
    signer
  ) as MockERC20;

  return contract;
};

export const getCERC20Contract = async ({
  chainId,
  signer,
}: GetContractParams) => {
  const contractAddress =
    cERC20Contracts[chainId as Web3ChainReference]?.address;

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
    CERC20__factory.abi,
    signer
  ) as CERC20;

  return contract;
};
