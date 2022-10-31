import type { Web3 } from "./NavBar/MetaMask";
import { createContext, useState, useEffect } from "react";
import { getHBTContract } from "src/utils/hbtContract";

declare let window: any;

export const Web3Context = createContext<Web3>(null!);

export const Web3Provider: React.FC = ({ children }) => {
  const [{ contract, provider, account, signer }, setWeb3] = useState<Web3>(
    {} as Web3
  );

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
      if (!contract) {
        await getHBTContract({ signer, chainId });
      }

      setWeb3((prev: Web3) => ({
        ...prev,
        signer,
        contract: contract.connect(signer),
        account: signer._address,
      }));
    }

    window.ethereum.on("accountsChanged", newAccount);
    return () => {
      window.ethereum.removeListener("accountsChanged", newAccount);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };, [account, provider]);

  return (
    <Web3Context.Provider
      value={{
        contract,
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
