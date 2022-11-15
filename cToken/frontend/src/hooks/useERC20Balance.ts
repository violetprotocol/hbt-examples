import { BigNumber } from "ethers";
import { useCallback, useContext, useEffect, useState } from "react";
import { Web3Context } from "src/context/Web3Context";
import { useRefresh } from "./useRefresh";

export const useERC20Balance = (account: string) => {
  const { erc20Contract } = useContext(Web3Context);
  const { fastRefresh } = useRefresh();
  const [balance, setBalance] = useState<BigNumber | undefined>(undefined);

  const getBalance = useCallback(async () => {
    if (!erc20Contract || !account) return;
    if (!erc20Contract.signer && !erc20Contract.provider) return;

    try {
      const bal = await erc20Contract.balanceOf(account);
      setBalance(bal);
    } catch (error) {
      console.error(error);
    }
  }, [erc20Contract, account]);

  useEffect(() => {
    getBalance();
  }, [fastRefresh, erc20Contract, account, getBalance]);

  return balance;
};
