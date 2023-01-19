import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { Web3ChainReference } from "src/shared";
import { Chains, SupportedChains } from "src/shared/config/chains";
import { allChains, chain, Chain, configureChains, createClient } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";

/**
 * Wagmi.sh Configuration (https://wagmi.sh/docs)
 */
export const isChainSupported = (chainId?: number): boolean => {
  if (chainId && SupportedChains.includes(chainId)) {
    return true;
  }
  return false;
};
const supportedChains: Chain[] = allChains.filter((chain) =>
  isChainSupported(chain.id)
);

export const getRpcUrl = (chainId: number): string => {
  return Chains[chainId as Web3ChainReference].rpcUrl;
};

export const { chains, provider } = configureChains(supportedChains, [
  jsonRpcProvider({
    rpc: (chain) => {
      const rpcUrl = getRpcUrl(chain.id);
      if (!rpcUrl) {
        throw new Error(`No RPC provided for chain ${chain.id}`);
      }
      return { http: rpcUrl };
    },
  }),
  publicProvider(),
]);

const { connectors } = getDefaultWallets({
  appName: "cERC20",
  chains,
});

export const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
});
