import { useRouter } from "next/router";
import Link from "next/link";

import { ToastContainer } from "react-toastify";
import { MetaMask } from "./MetaMask";
import { DarkModeToggle } from "src/helpers/DarkModeToggle";
import { hasClaimingPeriodStarted } from "src/utils";

export const NavBar = () => {
  const { asPath: path } = useRouter();

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
            <li className={path === "/swap" ? "active-nav" : "nav-item"}>
              <Link href="/swap">Swap</Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center">
          <MetaMask />
          <div className="ml-5">
            <DarkModeToggle />
          </div>
        </div>
      </header>
    </>
  );
};
