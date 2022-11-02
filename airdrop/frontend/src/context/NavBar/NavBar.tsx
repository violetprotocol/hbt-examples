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

            {hasClaimingPeriodStarted() ? (
              <li className={path === "/claim" ? "active-nav" : "nav-item"}>
                <Link href="/claim">Claim </Link>
              </li>
            ) : (
              <li className={path === "/eligible" ? "active-nav" : "nav-item"}>
                <Link href="/eligible">Register</Link>
              </li>
            )}
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
