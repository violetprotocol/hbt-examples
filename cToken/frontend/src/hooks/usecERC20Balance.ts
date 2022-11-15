import { BigNumber } from "ethers";
import { useCallback, useContext, useEffect, useState } from "react";
import { Web3Context } from "src/context/Web3Context";

export const usecERC20Balance = (account: string) => {
  const { cerc20Contract } = useContext(Web3Context);
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
  }, [cerc20Contract, account, getBalance]);

  return balance;
};
