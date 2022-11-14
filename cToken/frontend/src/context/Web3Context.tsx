import type { Web3 } from "./NavBar/MetaMask";
import { createContext, useState, useEffect } from "react";
import {
  getCERC20Contract,
  getERC20Contract,
  getHBTContract,
} from "src/utils/hbtContract";
import { CERC20, MockERC20, MockHBT } from "lib/types";

declare let window: any;

export const Web3Context = createContext<Web3>(null!);

export const Web3Provider: React.FC = ({ children }) => {
  const [
    { hbtContract, erc20Contract, cerc20Contract, provider, account, signer },
    setWeb3,
  ] = useState<Web3>({} as Web3);

  // Listens for network changes to reload the page
  useEffect(() => {
    window.ethereum.on("chainChanged", (chainId: string) =>
      window.location.reload()
    );
    return () => {
      window.ethereum.removeListener("chainChanged", (chainId: string) =>
        window.location.reload()
      );
    };
  }, []);

  // Listens for a change in account and updates state
  useEffect(() => {
    async function newAccount(accounts: Array<string>) {
      if (!provider) {
        return;
      }
      const signer = provider.getSigner(accounts[0]);
      const chainId = await signer.getChainId();
      let hbtContract: MockHBT | null;
      let erc20: MockERC20 | null;
      let cerc20: CERC20 | null;
      hbtContract = await getHBTContract({ signer, chainId });
      erc20 = await getERC20Contract({ signer, chainId });
      cerc20 = await getCERC20Contract({ signer, chainId });

      if (!hbtContract) {
        console.error("Failed to get HBT contract");
        return;
      }
      if (!erc20) {
        console.error("Failed to get mock erc20 contract");
        return;
      }
      if (!cerc20) {
        console.error("Failed to get compliant erc20 contract");
        return;
      }
      console.log(hbtContract);

      setWeb3((prev: Web3) => ({
        ...prev,
        signer,
        hbtContract: hbtContract!.connect(signer),
        erc20Contract: erc20!.connect(signer),
        cerc20Contract: cerc20!.connect(signer),
        account: signer._address,
      }));
    }

    window.ethereum.on("accountsChanged", newAccount);
    return () => {
      window.ethereum.removeListener("accountsChanged", newAccount);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, provider]);

  return (
    <Web3Context.Provider
      value={{
        hbtContract,
        erc20Contract,
        cerc20Contract,
        provider,
        account,
        signer,
        setWeb3,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
