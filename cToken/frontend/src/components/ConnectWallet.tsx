import Head from "next/head";
import { MetaMask } from "src/context/NavBar/MetaMask";

const ConnectWallet: React.FC = () => (
  <div className="text-center">
    <h1 className="text-center text-2xl mb-12">
      Connect your wallet to get started!
    </h1>
    <MetaMask />
  </div>
);

export default ConnectWallet;
