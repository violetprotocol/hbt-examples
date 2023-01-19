import { BigNumber } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { usecERC20Contract } from "./usecERC20Contract";
import { useERC20Contract } from "./useERC20Contract";
import { useRefresh } from "./useRefresh";

export const useERC20Allowance = () => {
  const erc20Contract = useERC20Contract();
  const cerc20Contract = usecERC20Contract();
  const { address } = useAccount();
  const { fastRefresh } = useRefresh();
  const [allowance, setAllowance] = useState<BigNumber | undefined>(undefined);

  const getAllowance = useCallback(async () => {
    if (!erc20Contract || !cerc20Contract || !address) return;
    if (!erc20Contract.signer && !erc20Contract.provider) return;

    try {
      const allow = await erc20Contract.allowance(
        address,
        cerc20Contract.address
      );
      setAllowance(allow);
    } catch (error) {
      console.error(error);
    }
  }, [erc20Contract, address]);

  useEffect(() => {
    getAllowance();
  }, [fastRefresh, erc20Contract, address, getAllowance]);

  return allowance;
};
