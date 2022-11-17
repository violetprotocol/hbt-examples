import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import { config as dotenvConfig } from "dotenv";
import { BigNumber } from "ethers";
import "hardhat-gas-reporter";
import { HardhatUserConfig, task } from "hardhat/config";
import { NetworkUserConfig } from "hardhat/types";
import { resolve } from "path";
import "solidity-coverage";

import "./tasks/deploy/cerc20";
import "./tasks/deploy/hbt";

dotenvConfig({ path: resolve(__dirname, "./.env") });

task("fund", "Get some ETH on your local test network")
  .addParam("to", "The recipient's address")
  .setAction(async (taskArgs, hre) => {
    const { ethers } = hre;
    const [firstSigner] = await ethers.getSigners();
    const to = taskArgs.to;
    const res = await firstSigner.sendTransaction({
      value: BigNumber.from(ethers.utils.parseEther("1")),
      to,
    });
    console.log(res);
    const balance = await ethers.provider.getBalance(to);

    console.log("New balance of recipient: ", ethers.utils.formatEther(balance), "ETH");
  });

const infuraApiKey = process.env.INFURA_API_KEY;

const chainIds = {
  "arbitrum-goerli": 421613,
  "arbitrum-mainnet": 42161,
  avalanche: 43114,
  bsc: 56,
  hardhat: 1337,
  mainnet: 1,
  "optimism-mainnet": 10,
  "optimism-goerli": 420,
  "polygon-mainnet": 137,
  "polygon-mumbai": 80001,
  rinkeby: 4,
  kovan: 42,
  goerli: 5,
};

function getChainConfig(network: keyof typeof chainIds): NetworkUserConfig {
  const url: string = "https://" + network + ".infura.io/v3/" + infuraApiKey;

  return {
    chainId: chainIds[network],
    url,
  };
}

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  gasReporter: {
    currency: "USD",
    enabled: process.env.REPORT_GAS ? true : false,
    excludeContracts: [],
    src: "./contracts",
  },
  networks: {
    hardhat: {
      chainId: chainIds.hardhat,
    },
    localhost: {
      chainId: chainIds.hardhat,
    },
    arbitrumOne: getChainConfig("arbitrum-mainnet"),
    arbitrumGoerli: getChainConfig("arbitrum-goerli"),
    avalanche: getChainConfig("avalanche"),
    bsc: getChainConfig("bsc"),
    mainnet: getChainConfig("mainnet"),
    optimism: getChainConfig("optimism-mainnet"),
    optimismGoerli: getChainConfig("optimism-goerli"),
    polygon: getChainConfig("polygon-mainnet"),
    polygonMumbai: getChainConfig("polygon-mumbai"),
    rinkeby: getChainConfig("rinkeby"),
    kovan: getChainConfig("kovan"),
    goerli: getChainConfig("goerli"),
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.14",
    settings: {
      metadata: {
        // Not including the metadata hash
        // https://github.com/paulrberg/solidity-template/issues/31
        bytecodeHash: "none",
      },
      // Disable the optimizer when debugging
      // https://hardhat.org/hardhat-network/#solidity-optimizer-support
      optimizer: {
        enabled: true,
        runs: 800,
      },
    },
  },
  typechain: {
    outDir: "src/types",
    target: "ethers-v5",
  },
};

export default config;
