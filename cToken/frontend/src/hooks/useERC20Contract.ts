import { useCallback, useEffect, useState } from "react";
import { getERC20Contract } from "src/utils/contract";
import { useRefresh } from "./useRefresh";
import { useNetwork, useSigner } from "wagmi";
import { MockERC20 } from "lib";

export const useERC20Contract = () => {
  const { data: signer } = useSigner();
  const { chain } = useNetwork();
  const { fastRefresh } = useRefresh();
  const [contract, setContract] = useState<MockERC20 | undefined>(undefined);

  const getContract = useCallback(async () => {
    if (!chain || !signer) return;
    try {
      const erc20Contract = await getERC20Contract({
        chainId: chain.id,
        signer,
      });
      setContract(erc20Contract);
    } catch (e) {
      console.error(e);
    }
  }, [signer, chain]);

  useEffect(() => {
    getContract();
  }, [fastRefresh, signer, chain]);

  return contract;
};
