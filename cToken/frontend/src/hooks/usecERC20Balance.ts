import { BigNumber } from "ethers";
import { useCallback, useContext, useEffect, useState } from "react";
import { usecERC20Contract } from "./usecERC20Contract";
import { useRefresh } from "./useRefresh";

export const usecERC20Balance = (account: string | undefined) => {
  const cerc20Contract = usecERC20Contract();
  const { fastRefresh } = useRefresh();
  const [balance, setBalance] = useState<BigNumber | undefined>(undefined);

  const getBalance = useCallback(async () => {
    if (!cerc20Contract || !account) return;
    if (!cerc20Contract.signer && !cerc20Contract.provider) return;

    try {
      const bal = await cerc20Contract.balanceOf(account);
      setBalance(bal);
    } catch (error) {
      console.error(error);
    }
  }, [cerc20Contract, account]);

  useEffect(() => {
    getBalance();
  }, [fastRefresh, cerc20Contract, account, getBalance]);

  return balance;
};
