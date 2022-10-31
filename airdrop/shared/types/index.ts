export type EthAddress = string;

export interface IClaim {
  address: EthAddress;
  amount: number;
}

export interface IHBT {
  id: string;
  numberOfRegisteredAddresses: number;
}

export enum BackendErrors {
  NOT_SIGNED_IN = "not_signed_in",
  INVALID_SIGNATURE_PROVIDED = "invalid_signature_provided",
  NOT_AN_HBT_OWNER = "not_an_HBT_owner",
  QUOTA_REACHED = "quota_reached",
  INTERNAL_ERROR = "internal_error",
}

export enum Web3ChainReference {
  // Local hardhat network
  EIP155_HARDHAT_LOCAL = 1337,
  // Ethereum
  EIP155_ETHEREUM_MAINNET = 1,
  EIP155_ETHEREUM_RINKEBY = 4,
  EIP155_ETHEREUM_KOVAN = 42,
  // Optimism
  EIP155_OPTIMISM = 10,
  EIP155_OPTIMISM_GOERLI = 420,
  // Arbitrum
  EIP155_ARBITRUM_ONE = 42161,
  EIP155_ARBITRUM_GOERLI = 421613,
  // Polygon
  EIP155_POLYGON_MAINNET = 137,
  EIP155_POLYGON_MUMBAI = 80001,
}

export interface HumanboundContractMetadata {
  address: string;
  fromBlock?: number;
}