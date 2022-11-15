import { BigNumber } from "ethers";
import { add } from "lodash";
import { useCallback, useContext, useEffect, useState } from "react";
import { Web3Context } from "src/context/Web3Context";
import { useRefresh } from "./useRefresh";

export const useERC20Allowance = () => {
  const { account, erc20Contract, cerc20Contract } = useContext(Web3Context);
  const { fastRefresh } = useRefresh();
  const [allowance, setAllowance] = useState<BigNumber | undefined>(undefined);

  const getAllowance = useCallback(async () => {
    if (!erc20Contract || !account) return;
    if (!erc20Contract.signer && !erc20Contract.provider) return;

    try {
      const allow = await erc20Contract.allowance(
        account,
        cerc20Contract.address
      );
      setAllowance(allow);
    } catch (error) {
      console.error(error);
    }
  }, [erc20Contract, account]);

  useEffect(() => {
    getAllowance();
  }, [fastRefresh, erc20Contract, account, getAllowance]);

  return allowance;
};
