import { BigNumber } from "ethers";
import { useCallback, useContext, useEffect, useState } from "react";
import { Web3Context } from "src/context/Web3Context";

export const useHasHBT = (account: string) => {
  const { hbtContract } = useContext(Web3Context);
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
  }, [hbtContract, account]);

  useEffect(() => {
    getHBTBalance();
  }, [hbtContract, account, getHBTBalance]);

  return hbtBalance?.gt(0);
};
