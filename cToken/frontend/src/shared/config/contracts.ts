import { ContractMetadata, Web3ChainReference } from "../types";

/**
 * Configuration file for:
 *    - HBT contract
 *    - ERC20 contract
 *    - cERC20 contract
 */

export const humanboundContracts: Record<Web3ChainReference, ContractMetadata> =
  {
    [Web3ChainReference.EIP155_HARDHAT_LOCAL]: {
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
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
      address: "0x8d39Fe83eD158F1B7e21A6434e0878D6c11F02B9",
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
    address: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
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
    address: "0x4Fd25044BB47Ff9a2E1a66182Aa2129FE08569fA",
    fromBlock: 2894712,
  },

  [Web3ChainReference.EIP155_ARBITRUM_ONE]: {
    address: "",
    fromBlock: 0,
  },

  [Web3ChainReference.EIP155_ARBITRUM_GOERLI]: {
    address: "0x154261910f46FBeaE4e04142a624bFAB157dCcda",
    fromBlock: 1568010,
  },

  [Web3ChainReference.EIP155_POLYGON_MAINNET]: {
    address: "",
    fromBlock: 0,
  },

  [Web3ChainReference.EIP155_POLYGON_MUMBAI]: {
    address: "0x8910Cfb44A8BE4d883029B0D2Ab0AD90fD94a0da",
    fromBlock: 29296910,
  },
};

export const MockERC20Contracts: Record<Web3ChainReference, ContractMetadata> =
  {
    [Web3ChainReference.EIP155_HARDHAT_LOCAL]: {
      address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
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
      address: "0x1888649D566908E0A4Ac17978740F6A04f600a51",
      fromBlock: 0,
    },

    [Web3ChainReference.EIP155_ARBITRUM_ONE]: {
      address: "",
      fromBlock: 0,
    },

    [Web3ChainReference.EIP155_ARBITRUM_GOERLI]: {
      address: "0x880058Ba98E914760545fedfe8C52a8EAb3054Ab",
      fromBlock: 1567476,
    },

    [Web3ChainReference.EIP155_POLYGON_MAINNET]: {
      address: "",
      fromBlock: 0,
    },

    [Web3ChainReference.EIP155_POLYGON_MUMBAI]: {
      address: "0x7D07CCCB7E78867bB36f34345aCcc4DF7A188E59",
      fromBlock: 0,
    },
  };
