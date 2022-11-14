import { ContractMetadata, Web3ChainReference } from "../types";

export const humanboundContracts: Record<Web3ChainReference, ContractMetadata> =
  {
    [Web3ChainReference.EIP155_HARDHAT_LOCAL]: {
      address: "0x581af8eaEa059cAA65A2652321aB7e2Cd3a4d423",
    },

    [Web3ChainReference.EIP155_ETHEREUM_MAINNET]: {
      address: "0x594E5550ecE2c10e5d580e538871914F55884f5d",
      fromBlock: 15599361,
    },

    [Web3ChainReference.EIP155_ETHEREUM_RINKEBY]: {
      address: "0x88339f95a4d7daaf868bd44eafac0559be946589",
    },

    [Web3ChainReference.EIP155_ETHEREUM_KOVAN]: {
      address: "0x6b591325Db5Bc220F98B6f09bD0C4E60B12821A6",
    },

    [Web3ChainReference.EIP155_OPTIMISM]: {
      address: "0xFF439bA52825Ffd65E39Fd2bF519566d0cd91827",
      fromBlock: 24879263,
    },

    [Web3ChainReference.EIP155_OPTIMISM_GOERLI]: {
      address: "0x5e5007bdd3eb92575499e17eabdd411b42cf79c0",
      fromBlock: 1745952,
    },

    [Web3ChainReference.EIP155_ARBITRUM_ONE]: {
      address: "0x5beB956A9Af054956c5C6c0aFac7b109236f86Aa",
      fromBlock: 26185010,
    },

    [Web3ChainReference.EIP155_ARBITRUM_GOERLI]: {
      address: "0x8d39fe83ed158f1b7e21a6434e0878d6c11f02b9",
      fromBlock: 542444,
    },

    [Web3ChainReference.EIP155_POLYGON_MAINNET]: {
      address: "0x41be3a6c17cf76442d9e7b150de4870027d36f52",
      fromBlock: 33099064,
    },

    [Web3ChainReference.EIP155_POLYGON_MUMBAI]: {
      address: "0x1888649d566908e0a4ac17978740f6a04f600a51",
      fromBlock: 28100366,
    },
  };

export const cERC20Contracts: Record<Web3ChainReference, ContractMetadata> = {
  [Web3ChainReference.EIP155_HARDHAT_LOCAL]: {
    address: "0x2eA7d48c96b91018F219c7B884A4E22628Bd0FF5",
  },

  [Web3ChainReference.EIP155_ETHEREUM_MAINNET]: {
    address: "",
    fromBlock: 0,
  },

  [Web3ChainReference.EIP155_ETHEREUM_RINKEBY]: {
    address: "",
  },

  [Web3ChainReference.EIP155_ETHEREUM_KOVAN]: {
    address: "",
  },

  [Web3ChainReference.EIP155_OPTIMISM]: {
    address: "",
    fromBlock: 0,
  },

  [Web3ChainReference.EIP155_OPTIMISM_GOERLI]: {
    address: "",
    fromBlock: 0,
  },

  [Web3ChainReference.EIP155_ARBITRUM_ONE]: {
    address: "",
    fromBlock: 0,
  },

  [Web3ChainReference.EIP155_ARBITRUM_GOERLI]: {
    address: "",
    fromBlock: 0,
  },

  [Web3ChainReference.EIP155_POLYGON_MAINNET]: {
    address: "",
    fromBlock: 0,
  },

  [Web3ChainReference.EIP155_POLYGON_MUMBAI]: {
    address: "",
    fromBlock: 0,
  },
};

export const MockERC20Contracts: Record<Web3ChainReference, ContractMetadata> =
  {
    [Web3ChainReference.EIP155_HARDHAT_LOCAL]: {
      address: "0xd66d4Fa10270Ed8DFfDB6f4c5bA3AE0e1c3DD0e6",
    },

    [Web3ChainReference.EIP155_ETHEREUM_MAINNET]: {
      address: "",
      fromBlock: 0,
    },

    [Web3ChainReference.EIP155_ETHEREUM_RINKEBY]: {
      address: "",
    },

    [Web3ChainReference.EIP155_ETHEREUM_KOVAN]: {
      address: "",
    },

    [Web3ChainReference.EIP155_OPTIMISM]: {
      address: "",
      fromBlock: 0,
    },

    [Web3ChainReference.EIP155_OPTIMISM_GOERLI]: {
      address: "",
      fromBlock: 0,
    },

    [Web3ChainReference.EIP155_ARBITRUM_ONE]: {
      address: "",
      fromBlock: 0,
    },

    [Web3ChainReference.EIP155_ARBITRUM_GOERLI]: {
      address: "",
      fromBlock: 0,
    },

    [Web3ChainReference.EIP155_POLYGON_MAINNET]: {
      address: "",
      fromBlock: 0,
    },

    [Web3ChainReference.EIP155_POLYGON_MUMBAI]: {
      address: "",
      fromBlock: 0,
    },
  };
