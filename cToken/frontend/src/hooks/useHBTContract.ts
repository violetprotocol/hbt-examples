import { BigNumber } from "ethers";
import { useCallback, useContext, useEffect, useState } from "react";
import { getHBTContract } from "src/utils/contract";
import { useRefresh } from "./useRefresh";
import { useNetwork, useSigner } from "wagmi";
import { MockHBT } from "lib";

export const useHBTContract = () => {
  const { data: signer } = useSigner();
  const { chain } = useNetwork();
  const { fastRefresh } = useRefresh();
  const [contract, setContract] = useState<MockHBT | undefined>(undefined);

  const getContract = useCallback(async () => {
    if (!chain || !signer) return;
    try {
      const hbtContract = await getHBTContract({ chainId: chain.id, signer });
      setContract(hbtContract);
    } catch (e) {
      console.error(e);
    }
  }, [signer, chain]);

  useEffect(() => {
    getContract();
  }, [fastRefresh, signer, chain]);

  return contract;
};
