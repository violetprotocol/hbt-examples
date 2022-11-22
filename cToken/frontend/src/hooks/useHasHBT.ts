import { BigNumber } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { useRefresh } from "./useRefresh";
import { useHBTContract } from "./useHBTContract";

export const useHasHBT = (account: string | undefined) => {
  const hbtContract = useHBTContract();
  const { fastRefresh } = useRefresh();
  const [hbtBalance, setHbtBalance] = useState<BigNumber | undefined>(
    undefined
  );

  const getHBTBalance = useCallback(async () => {
    if (!hbtContract || !account) return;
    if (!hbtContract.signer && !hbtContract.provider) return;

    try {
      const balance = await hbtContract.balanceOf(account);
      setHbtBalance(balance);
    } catch (error) {
      console.error(error);
    }
  }, [account, hbtContract]);

  useEffect(() => {
    getHBTBalance();
  }, [fastRefresh, account, hbtContract, getHBTBalance]);

  return hbtBalance?.gt(0);
};
