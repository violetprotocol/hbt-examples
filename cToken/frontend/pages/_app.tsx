import type { AppProps } from "next/app";
import "styles/globals.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-toastify/dist/ReactToastify.css";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

import { WagmiConfig } from "wagmi";
import Layout from "src/context/Layout";
import { RefreshContextProvider } from "src/context/RefreshContext";
import { chains, wagmiClient } from "src/utils/wagmi";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        modalSize="compact"
        theme={darkTheme({
          accentColor: "#A73CFD",
        })}
      >
        <RefreshContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RefreshContextProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
