import { NetworkMetadata, Web3ChainReference } from "../types";

export const SupportedChains: Web3ChainReference[] = [
  Web3ChainReference.EIP155_HARDHAT_LOCAL,
  Web3ChainReference.EIP155_ETHEREUM_KOVAN,
  Web3ChainReference.EIP155_ARBITRUM_GOERLI,
  Web3ChainReference.EIP155_OPTIMISM_GOERLI,
  Web3ChainReference.EIP155_POLYGON_MUMBAI,
];

export const Chains: Record<Web3ChainReference, NetworkMetadata> = {
  [Web3ChainReference.EIP155_HARDHAT_LOCAL]: {
    displayName: "Local RPC",
    deployment: "testnet",
    layer: "ethereum",
    rpcUrl: "http://localhost:8545",
    blockExplorer: {
      name: "",
      url: "",
    },
    currency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    iconImage: "",
  },
  [Web3ChainReference.EIP155_ETHEREUM_MAINNET]: {
    displayName: "Ethereum Mainnet",
    deployment: "mainnet",
    layer: "ethereum",
    rpcUrl:
      "https://eth-mainnet.nodereal.io/v1/1659dfb40aa24bbb8153a677b98064d7",
    blockExplorer: {
      name: "Etherscan",
      url: "https://etherscan.io",
    },
    currency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    iconImage:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgZmlsbD0ibm9uZSI+PHBhdGggZmlsbD0iIzI1MjkyRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTQgMjhhMTQgMTQgMCAxIDAgMC0yOCAxNCAxNCAwIDAgMCAwIDI4WiIgY2xpcC1ydWxlPSJldmVub2RkIi8+PHBhdGggZmlsbD0idXJsKCNhKSIgZmlsbC1vcGFjaXR5PSIuMyIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTQgMjhhMTQgMTQgMCAxIDAgMC0yOCAxNCAxNCAwIDAgMCAwIDI4WiIgY2xpcC1ydWxlPSJldmVub2RkIi8+PHBhdGggZmlsbD0idXJsKCNiKSIgZD0iTTguMTkgMTQuNzcgMTQgMTguMjFsNS44LTMuNDQtNS44IDguMTktNS44MS04LjE5WiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Im0xNCAxNi45My01LjgxLTMuNDRMMTQgNC4zNGw1LjgxIDkuMTVMMTQgMTYuOTNaIi8+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJhIiB4MT0iMCIgeDI9IjE0IiB5MT0iMCIgeTI9IjI4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI2ZmZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIwIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImIiIHgxPSIxNCIgeDI9IjE0IiB5MT0iMTQuNzciIHkyPSIyMi45NiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiNmZmYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmZmYiIHN0b3Atb3BhY2l0eT0iLjkiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48L3N2Zz4K",
  },
  [Web3ChainReference.EIP155_ETHEREUM_RINKEBY]: {
    displayName: "Ethereum Rinkeby",
    deployment: "depreciated",
    layer: "ethereum",
    rpcUrl: "https://rpc.ankr.com/eth_rinkeby",
    blockExplorer: {
      name: "Etherscan",
      url: "https://rinkeby.etherscan.io",
    },
    currency: {
      name: "Rinkeby ETH",
      symbol: "rETH",
      decimals: 18,
    },
    iconImage:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgZmlsbD0ibm9uZSI+PHBhdGggZmlsbD0iIzI1MjkyRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTQgMjhhMTQgMTQgMCAxIDAgMC0yOCAxNCAxNCAwIDAgMCAwIDI4WiIgY2xpcC1ydWxlPSJldmVub2RkIi8+PHBhdGggZmlsbD0idXJsKCNhKSIgZmlsbC1vcGFjaXR5PSIuMyIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTQgMjhhMTQgMTQgMCAxIDAgMC0yOCAxNCAxNCAwIDAgMCAwIDI4WiIgY2xpcC1ydWxlPSJldmVub2RkIi8+PHBhdGggZmlsbD0idXJsKCNiKSIgZD0iTTguMTkgMTQuNzcgMTQgMTguMjFsNS44LTMuNDQtNS44IDguMTktNS44MS04LjE5WiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Im0xNCAxNi45My01LjgxLTMuNDRMMTQgNC4zNGw1LjgxIDkuMTVMMTQgMTYuOTNaIi8+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJhIiB4MT0iMCIgeDI9IjE0IiB5MT0iMCIgeTI9IjI4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI2ZmZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIwIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImIiIHgxPSIxNCIgeDI9IjE0IiB5MT0iMTQuNzciIHkyPSIyMi45NiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiNmZmYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmZmYiIHN0b3Atb3BhY2l0eT0iLjkiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48L3N2Zz4K",
  },
  [Web3ChainReference.EIP155_ETHEREUM_KOVAN]: {
    displayName: "Ethereum Kovan",
    deployment: "depreciated",
    layer: "ethereum",
    rpcUrl: "http://kovan.poa.network:8545",
    blockExplorer: {
      name: "Etherscan",
      url: "https://kovan.etherscan.io",
    },
    currency: {
      name: "Kovan ETH",
      symbol: "kETH",
      decimals: 18,
    },
    iconImage:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgZmlsbD0ibm9uZSI+PHBhdGggZmlsbD0iIzI1MjkyRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTQgMjhhMTQgMTQgMCAxIDAgMC0yOCAxNCAxNCAwIDAgMCAwIDI4WiIgY2xpcC1ydWxlPSJldmVub2RkIi8+PHBhdGggZmlsbD0idXJsKCNhKSIgZmlsbC1vcGFjaXR5PSIuMyIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTQgMjhhMTQgMTQgMCAxIDAgMC0yOCAxNCAxNCAwIDAgMCAwIDI4WiIgY2xpcC1ydWxlPSJldmVub2RkIi8+PHBhdGggZmlsbD0idXJsKCNiKSIgZD0iTTguMTkgMTQuNzcgMTQgMTguMjFsNS44LTMuNDQtNS44IDguMTktNS44MS04LjE5WiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Im0xNCAxNi45My01LjgxLTMuNDRMMTQgNC4zNGw1LjgxIDkuMTVMMTQgMTYuOTNaIi8+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJhIiB4MT0iMCIgeDI9IjE0IiB5MT0iMCIgeTI9IjI4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI2ZmZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIwIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImIiIHgxPSIxNCIgeDI9IjE0IiB5MT0iMTQuNzciIHkyPSIyMi45NiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiNmZmYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmZmYiIHN0b3Atb3BhY2l0eT0iLjkiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48L3N2Zz4K",
  },
  [Web3ChainReference.EIP155_OPTIMISM]: {
    displayName: "Optimism",
    deployment: "mainnet",
    layer: "optimism",
    rpcUrl: "https://mainnet.optimism.io",
    blockExplorer: {
      name: "Etherscan",
      url: "https://optimistic.etherscan.io",
    },
    currency: {
      name: "OETH",
      symbol: "OETH",
      decimals: 18,
    },
    iconImage:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgZmlsbD0ibm9uZSI+PHJlY3Qgd2lkdGg9IjI4IiBoZWlnaHQ9IjI4IiBmaWxsPSIjRkYzMTMxIiByeD0iMTQiLz48cmVjdCB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIGZpbGw9InVybCgjYSkiIGZpbGwtb3BhY2l0eT0iLjMiIHJ4PSIxNCIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik05LjIyIDE4LjM1YzIuNyAwIDQuODYtMi4yIDQuODYtNS4zOCAwLTIuMTktMS40Ny0zLjgtMy45OC0zLjgtMi43MiAwLTQuODUgMi4yLTQuODUgNS4zOCAwIDIuMiAxLjUgMy44IDMuOTcgMy44Wm0uODMtNy4zNWMxLjA2IDAgMS43NC44MSAxLjc0IDIuMSAwIDEuOS0xLjExIDMuNDItMi41MSAzLjQyLTEuMDYgMC0xLjc0LS44Mi0xLjc0LTIuMSAwLTEuODkgMS4xMS0zLjQyIDIuNS0zLjQyWm02LjM4LTEuNjgtMS44OCA4Ljg4aDIuMjZsLjU1LTIuNmgxLjQ3YzIuNDMgMCA0LjAxLTEuMzggNC4wMS0zLjYgMC0xLjYxLTEuMTctMi42OC0zLjEtMi42OGgtMy4zWm0xLjkgMS43NGguOTRjLjgzIDAgMS4zLjM4IDEuMyAxLjE0IDAgMS0uNjggMS43LTEuNzQgMS43aC0xLjExbC42LTIuODRaIi8+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJhIiB4MT0iMCIgeDI9IjE0IiB5MT0iMCIgeTI9IjI4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI2ZmZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIwIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PC9zdmc+Cg==",
  },
  [Web3ChainReference.EIP155_OPTIMISM_GOERLI]: {
    displayName: "Optimism Goerli",
    deployment: "testnet",
    layer: "optimism",
    rpcUrl: "https://goerli.optimism.io/",
    blockExplorer: {
      name: "Etherscan",
      url: "https://goerli-optimism.etherscan.io",
    },
    currency: {
      name: "OETH",
      symbol: "OETH",
      decimals: 18,
    },
    iconImage:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgZmlsbD0ibm9uZSI+PHJlY3Qgd2lkdGg9IjI4IiBoZWlnaHQ9IjI4IiBmaWxsPSIjRkYzMTMxIiByeD0iMTQiLz48cmVjdCB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIGZpbGw9InVybCgjYSkiIGZpbGwtb3BhY2l0eT0iLjMiIHJ4PSIxNCIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik05LjIyIDE4LjM1YzIuNyAwIDQuODYtMi4yIDQuODYtNS4zOCAwLTIuMTktMS40Ny0zLjgtMy45OC0zLjgtMi43MiAwLTQuODUgMi4yLTQuODUgNS4zOCAwIDIuMiAxLjUgMy44IDMuOTcgMy44Wm0uODMtNy4zNWMxLjA2IDAgMS43NC44MSAxLjc0IDIuMSAwIDEuOS0xLjExIDMuNDItMi41MSAzLjQyLTEuMDYgMC0xLjc0LS44Mi0xLjc0LTIuMSAwLTEuODkgMS4xMS0zLjQyIDIuNS0zLjQyWm02LjM4LTEuNjgtMS44OCA4Ljg4aDIuMjZsLjU1LTIuNmgxLjQ3YzIuNDMgMCA0LjAxLTEuMzggNC4wMS0zLjYgMC0xLjYxLTEuMTctMi42OC0zLjEtMi42OGgtMy4zWm0xLjkgMS43NGguOTRjLjgzIDAgMS4zLjM4IDEuMyAxLjE0IDAgMS0uNjggMS43LTEuNzQgMS43aC0xLjExbC42LTIuODRaIi8+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJhIiB4MT0iMCIgeDI9IjE0IiB5MT0iMCIgeTI9IjI4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI2ZmZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIwIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PC9zdmc+Cg==",
  },
  [Web3ChainReference.EIP155_ARBITRUM_ONE]: {
    displayName: "Arbitrum One",
    deployment: "mainnet",
    layer: "arbitrum",
    rpcUrl: "https://rpc.ankr.com/arbitrum",
    blockExplorer: {
      name: "Arbiscan",
      url: "https://arbiscan.io",
    },
    currency: {
      name: "Arbitrum ETH",
      symbol: "AETH",
      decimals: 18,
    },
    iconImage:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgZmlsbD0ibm9uZSI+PHJlY3Qgd2lkdGg9IjI2LjYiIGhlaWdodD0iMjYuNiIgeD0iLjciIHk9Ii43IiBmaWxsPSIjMkQzNzRCIiBzdHJva2U9IiM5NkJFREMiIHN0cm9rZS13aWR0aD0iMS40IiByeD0iMTMuMyIvPjxtYXNrIGlkPSJhIiB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHg9IjAiIHk9IjAiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiIHN0eWxlPSJtYXNrLXR5cGU6YWxwaGEiPjxyZWN0IHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgZmlsbD0iI0M0QzRDNCIgcng9IjE0Ii8+PC9tYXNrPjxnIG1hc2s9InVybCgjYSkiPjxwYXRoIGZpbGw9IiMyOEEwRjAiIGQ9Im0xNC4wODYxIDE4LjYwNDEgNi41MDE0IDEwLjIyMzkgNC4wMDU3LTIuMzIxMy03Ljg2LTEyLjM5NDMtMi42NDcxIDQuNDkxN1ptMTMuMDc0NCAzLjQ2OTItLjAwMy0xLjg1OTktNy4zMDY0LTExLjQwNy0yLjMwODcgMy45MTczIDcuMDkxIDExLjQzMDMgMi4xNzItMS4yNTg2YS45NjI4Ljk2MjggMCAwIDAgLjM1NTUtLjcwMDlsLS4wMDA0LS4xMjEyWiIvPjxyZWN0IHdpZHRoPSIyNS45IiBoZWlnaHQ9IjI1LjkiIHg9IjEuMDUiIHk9IjEuMDUiIGZpbGw9InVybCgjYikiIGZpbGwtb3BhY2l0eT0iLjMiIHN0cm9rZT0iIzk2QkVEQyIgc3Ryb2tlLXdpZHRoPSIyLjEiIHJ4PSIxMi45NSIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Im0uMzYzNCAyOC4yMjA3LTMuMDctMS43Njc0LS4yMzQtLjgzMzNMNy43NDYxIDkuMDE5NGMuNzI5OC0xLjE5MTMgMi4zMTk3LTEuNTc1IDMuNzk1Ny0xLjU1NDFsMS43MzIzLjA0NTdMLjM2MzQgMjguMjIwN1pNMTkuMTY1NSA3LjUxMWwtNC41NjUzLjAxNjZMMi4yNCAyNy45NTMzbDMuNjEwMyAyLjA3ODguOTgxOC0xLjY2NTJMMTkuMTY1NSA3LjUxMVoiLz48L2c+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJiIiB4MT0iMCIgeDI9IjE0IiB5MT0iMCIgeTI9IjI4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI2ZmZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIwIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PC9zdmc+Cg==",
  },
  [Web3ChainReference.EIP155_ARBITRUM_GOERLI]: {
    displayName: "Arbitrum Goerli",
    deployment: "testnet",
    layer: "arbitrum",
    rpcUrl: "https://goerli-rollup.arbitrum.io/rpc/",
    blockExplorer: {
      name: "Arbitrum",
      url: "https://goerli-rollup-explorer.arbitrum.io",
    },
    currency: {
      name: "Arbitrum Goerli ETH",
      symbol: "AGOR",
      decimals: 18,
    },
    iconImage:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgZmlsbD0ibm9uZSI+PHJlY3Qgd2lkdGg9IjI2LjYiIGhlaWdodD0iMjYuNiIgeD0iLjciIHk9Ii43IiBmaWxsPSIjMkQzNzRCIiBzdHJva2U9IiM5NkJFREMiIHN0cm9rZS13aWR0aD0iMS40IiByeD0iMTMuMyIvPjxtYXNrIGlkPSJhIiB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHg9IjAiIHk9IjAiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiIHN0eWxlPSJtYXNrLXR5cGU6YWxwaGEiPjxyZWN0IHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgZmlsbD0iI0M0QzRDNCIgcng9IjE0Ii8+PC9tYXNrPjxnIG1hc2s9InVybCgjYSkiPjxwYXRoIGZpbGw9IiMyOEEwRjAiIGQ9Im0xNC4wODYxIDE4LjYwNDEgNi41MDE0IDEwLjIyMzkgNC4wMDU3LTIuMzIxMy03Ljg2LTEyLjM5NDMtMi42NDcxIDQuNDkxN1ptMTMuMDc0NCAzLjQ2OTItLjAwMy0xLjg1OTktNy4zMDY0LTExLjQwNy0yLjMwODcgMy45MTczIDcuMDkxIDExLjQzMDMgMi4xNzItMS4yNTg2YS45NjI4Ljk2MjggMCAwIDAgLjM1NTUtLjcwMDlsLS4wMDA0LS4xMjEyWiIvPjxyZWN0IHdpZHRoPSIyNS45IiBoZWlnaHQ9IjI1LjkiIHg9IjEuMDUiIHk9IjEuMDUiIGZpbGw9InVybCgjYikiIGZpbGwtb3BhY2l0eT0iLjMiIHN0cm9rZT0iIzk2QkVEQyIgc3Ryb2tlLXdpZHRoPSIyLjEiIHJ4PSIxMi45NSIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Im0uMzYzNCAyOC4yMjA3LTMuMDctMS43Njc0LS4yMzQtLjgzMzNMNy43NDYxIDkuMDE5NGMuNzI5OC0xLjE5MTMgMi4zMTk3LTEuNTc1IDMuNzk1Ny0xLjU1NDFsMS43MzIzLjA0NTdMLjM2MzQgMjguMjIwN1pNMTkuMTY1NSA3LjUxMWwtNC41NjUzLjAxNjZMMi4yNCAyNy45NTMzbDMuNjEwMyAyLjA3ODguOTgxOC0xLjY2NTJMMTkuMTY1NSA3LjUxMVoiLz48L2c+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJiIiB4MT0iMCIgeDI9IjE0IiB5MT0iMCIgeTI9IjI4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI2ZmZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIwIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PC9zdmc+Cg==",
  },
  [Web3ChainReference.EIP155_POLYGON_MAINNET]: {
    displayName: "Polygon",
    deployment: "mainnet",
    layer: "polygon",
    rpcUrl: "https://rpc.ankr.com/polygon",
    blockExplorer: {
      name: "Polygonscan",
      url: "https://polygonscan.com",
    },
    currency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    iconImage:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgZmlsbD0ibm9uZSI+PHJlY3Qgd2lkdGg9IjI4IiBoZWlnaHQ9IjI4IiBmaWxsPSIjODI0N0U1IiByeD0iMTQiLz48cmVjdCB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIGZpbGw9InVybCgjYSkiIGZpbGwtb3BhY2l0eT0iLjMiIHJ4PSIxNCIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0xOC4yOCAxMC45MmExLjA2IDEuMDYgMCAwIDAtMS4wNiAwbC0yLjQxIDEuNDItMS42NS45My0yLjQxIDEuNDNjLS4zMS4xOS0uNzIuMTktMS4wNiAwbC0xLjkyLTEuMTJhMS4wNyAxLjA3IDAgMCAxLS41My0uOXYtMi4yYTEgMSAwIDAgMSAuNTMtLjlsMS45LTEuMDhjLjMtLjE4LjctLjE4IDEuMDQgMGwxLjkgMS4wOWMuMy4xOC41Mi41Mi41Mi45djEuNDJsMS42NC0uOTZWOS41MmExIDEgMCAwIDAtLjUyLS45bC0zLjUtMi4wNGExLjA2IDEuMDYgMCAwIDAtMS4wNiAwTDYuMTMgOC42M2ExIDEgMCAwIDAtLjUzLjl2NC4xMmExIDEgMCAwIDAgLjUzLjlsMy41NiAyLjA0Yy4zMS4xOS43MS4xOSAxLjA2IDBsMi40MS0xLjQgMS42NS0uOTUgMi40MS0xLjRjLjMxLS4xOS43Mi0uMTkgMS4wNiAwbDEuODkgMS4wOWMuMy4xOC41My41Mi41My45djIuMmExIDEgMCAwIDEtLjUzLjlsLTEuOSAxLjExYy0uMy4xOS0uNy4xOS0xLjA1IDBsLTEuODktMS4wOGExLjA3IDEuMDcgMCAwIDEtLjUyLS45di0xLjQzbC0xLjY1Ljk2djEuNDNhMSAxIDAgMCAwIC41My45bDMuNTYgMi4wNGMuMzEuMTkuNzIuMTkgMS4wNiAwbDMuNTYtMi4wNGMuMzEtLjE5LjUzLS41My41My0uOXYtNC4xM2ExIDEgMCAwIDAtLjUzLS45bC0zLjYtMi4wN1oiLz48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIwIiB4Mj0iMTQiIHkxPSIwIiB5Mj0iMjgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmIiBzdG9wLW9wYWNpdHk9IjAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48L3N2Zz4K",
  },
  [Web3ChainReference.EIP155_POLYGON_MUMBAI]: {
    displayName: "Polygon Mumbai",
    deployment: "testnet",
    layer: "polygon",
    rpcUrl: "https://rpc-mumbai.maticvigil.com",
    blockExplorer: {
      name: "Polygonscan",
      url: "https://mumbai.polygonscan.com",
    },
    currency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    iconImage:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgZmlsbD0ibm9uZSI+PHJlY3Qgd2lkdGg9IjI4IiBoZWlnaHQ9IjI4IiBmaWxsPSIjODI0N0U1IiByeD0iMTQiLz48cmVjdCB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIGZpbGw9InVybCgjYSkiIGZpbGwtb3BhY2l0eT0iLjMiIHJ4PSIxNCIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0xOC4yOCAxMC45MmExLjA2IDEuMDYgMCAwIDAtMS4wNiAwbC0yLjQxIDEuNDItMS42NS45My0yLjQxIDEuNDNjLS4zMS4xOS0uNzIuMTktMS4wNiAwbC0xLjkyLTEuMTJhMS4wNyAxLjA3IDAgMCAxLS41My0uOXYtMi4yYTEgMSAwIDAgMSAuNTMtLjlsMS45LTEuMDhjLjMtLjE4LjctLjE4IDEuMDQgMGwxLjkgMS4wOWMuMy4xOC41Mi41Mi41Mi45djEuNDJsMS42NC0uOTZWOS41MmExIDEgMCAwIDAtLjUyLS45bC0zLjUtMi4wNGExLjA2IDEuMDYgMCAwIDAtMS4wNiAwTDYuMTMgOC42M2ExIDEgMCAwIDAtLjUzLjl2NC4xMmExIDEgMCAwIDAgLjUzLjlsMy41NiAyLjA0Yy4zMS4xOS43MS4xOSAxLjA2IDBsMi40MS0xLjQgMS42NS0uOTUgMi40MS0xLjRjLjMxLS4xOS43Mi0uMTkgMS4wNiAwbDEuODkgMS4wOWMuMy4xOC41My41Mi41My45djIuMmExIDEgMCAwIDEtLjUzLjlsLTEuOSAxLjExYy0uMy4xOS0uNy4xOS0xLjA1IDBsLTEuODktMS4wOGExLjA3IDEuMDcgMCAwIDEtLjUyLS45di0xLjQzbC0xLjY1Ljk2djEuNDNhMSAxIDAgMCAwIC41My45bDMuNTYgMi4wNGMuMzEuMTkuNzIuMTkgMS4wNiAwbDMuNTYtMi4wNGMuMzEtLjE5LjUzLS41My41My0uOXYtNC4xM2ExIDEgMCAwIDAtLjUzLS45bC0zLjYtMi4wN1oiLz48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSIwIiB4Mj0iMTQiIHkxPSIwIiB5Mj0iMjgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmIiBzdG9wLW9wYWNpdHk9IjAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48L3N2Zz4K",
  },
};
