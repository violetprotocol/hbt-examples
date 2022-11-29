import { NavBar } from "./NavBar/NavBar";
import Head from "next/head";
import ConnectWallet from "src/components/ConnectWallet";
import { useAccount } from "wagmi";
import Footer from "./Footer";

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
      {address && <Footer />}
    </>
  );
};

export default Layout;
