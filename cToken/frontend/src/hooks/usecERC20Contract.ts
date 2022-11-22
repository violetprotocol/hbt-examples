import { useCallback, useEffect, useState } from "react";
import { getCERC20Contract } from "src/utils/contract";
import { useRefresh } from "./useRefresh";
import { useNetwork, useSigner } from "wagmi";
import { CERC20 } from "lib";

export const usecERC20Contract = () => {
  const { data: signer } = useSigner();
  const { chain } = useNetwork();
  const { fastRefresh } = useRefresh();
  const [contract, setContract] = useState<CERC20 | undefined>(undefined);

  const getContract = useCallback(async () => {
    if (!chain || !signer) return;
    try {
      const cerc20Contract = await getCERC20Contract({
        chainId: chain.id,
        signer,
      });
      setContract(cerc20Contract);
    } catch (e) {
      console.error(e);
    }
  }, [signer, chain]);

  useEffect(() => {
    getContract();
  }, [fastRefresh, signer, chain]);

  return contract;
};
