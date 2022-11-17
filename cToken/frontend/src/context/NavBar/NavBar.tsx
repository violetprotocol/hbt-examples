import { useRouter } from "next/router";
import Link from "next/link";

import { ToastContainer } from "react-toastify";
import { MetaMask } from "./MetaMask";
import { DarkModeToggle } from "src/helpers/DarkModeToggle";
import { hasClaimingPeriodStarted } from "src/utils";
import CERCBalance from "src/components/CERCBalance";
import { useContext } from "react";
import { Web3Context } from "../Web3Context";

export const NavBar = () => {
  const { asPath: path } = useRouter();
  const { account } = useContext(Web3Context);

  return (
    <>
      <ToastContainer />
      <header
        className="flex justify-around items-center py-3
				border-b-2 border-gray-100 dark:border-gray-700"
      >
        <nav>
          <ul className="nav-elements">
            <li className={path === "/" ? "active-nav" : "nav-item"}>
              <Link href="/">Home</Link>
            </li>
            <li className={path === "/mint" ? "active-nav" : "nav-item"}>
              <Link href="/mint">Mint</Link>
            </li>
            <li className={path === "/wrap" ? "active-nav" : "nav-item"}>
              <Link href="/wrap">Wrap</Link>
            </li>
            <li className={path === "/send" ? "active-nav" : "nav-item"}>
              <Link href="/send">Send</Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center">
          <div className="ml-5">
            <CERCBalance />
          </div>
          {account && <MetaMask />}
          <div className="ml-5">
            <DarkModeToggle />
          </div>
        </div>
      </header>
    </>
  );
};
