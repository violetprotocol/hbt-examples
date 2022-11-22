import { NavBar } from "./NavBar/NavBar";
import Head from "next/head";
import { Web3Context } from "./Web3Context";
import { useContext } from "react";
import ConnectWallet from "src/components/ConnectWallet";
import { useAccount } from "wagmi";

const Layout: React.FC = ({ children }) => {
  const { address } = useAccount();

  return (
    <>
      <Head>
        {/* <link rel="icon" href="" /> */}
        {/* <link rel="shortcut icon" href="" /> */}
      </Head>
      <NavBar />
      <main>{address != undefined ? children : <ConnectWallet />}</main>
    </>
  );
};

export default Layout;
