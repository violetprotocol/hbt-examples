import { useRouter } from "next/router";
import Link from "next/link";

import { ToastContainer } from "react-toastify";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { DarkModeToggle } from "src/helpers/DarkModeToggle";
import CERCBalance from "src/components/CERCBalance";

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
            <li className={path === "/send" ? "active-nav" : "nav-item"}>
              <Link href="/send">Send</Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center">
          <div className="ml-5">
            <CERCBalance />
          </div>
          <ConnectButton />
          <div className="ml-5">
            <DarkModeToggle />
          </div>
        </div>
      </header>
    </>
  );
};
