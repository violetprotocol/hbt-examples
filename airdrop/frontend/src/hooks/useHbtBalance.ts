import { BigNumber } from "ethers";
import { MockHBT } from "lib/typechain-types";
import { useCallback, useEffect, useState } from "react";
import { EthAddress } from "../../../shared";

export const useHbtBalance = (contract: MockHBT, account: EthAddress) => {
  const [hbtBalance, setHbtBalance] = useState<BigNumber | undefined>(
    undefined
  );

  const getBalance = useCallback(async () => {
    if (!contract || !account) return;
    if (!contract.signer && !contract.provider) return;

    try {
      const balance = await contract.balanceOf(account);
      setHbtBalance(balance);
    } catch (error) {
      console.error(error);
    }
  }, [contract, account]);

  useEffect(() => {
    getBalance();
  }, [account, contract, getBalance]);

  return { hbtBalance, getBalance };
};
