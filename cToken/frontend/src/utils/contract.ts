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

const getContract = async <ContractType>(
  abi: any,
  signer: any,
  contractAddress: any
) => {
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
    abi,
    signer
  ) as ContractType;

  return contract;
};

export const getHBTContract = async ({
  chainId,
  signer,
}: GetContractParams) => {
  const contractAddress =
    humanboundContracts[chainId as Web3ChainReference]?.address;

  return <MockHBT>(
    await getContract(MockHBT__factory.abi, signer, contractAddress)
  );
};

export const getERC20Contract = async ({
  chainId,
  signer,
}: GetContractParams) => {
  const contractAddress =
    MockERC20Contracts[chainId as Web3ChainReference]?.address;

  return <MockERC20>(
    await getContract(MockERC20__factory.abi, signer, contractAddress)
  );
};

export const getCERC20Contract = async ({
  chainId,
  signer,
}: GetContractParams) => {
  const contractAddress =
    cERC20Contracts[chainId as Web3ChainReference]?.address;

  return <CERC20>(
    await getContract(CERC20__factory.abi, signer, contractAddress)
  );
};
