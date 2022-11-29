import Head from "next/head";
import { useContext, useState } from "react";
import { useAccount, useNetwork } from "wagmi";
import { Mining } from "src/helpers/Mining";
import { generateRandomTokenId } from "src/utils";
import { displayToast } from "src/utils/toast";
import { useHBTContract } from "src/hooks/useHBTContract";
import { Web3ChainReference } from "src/shared";
import { useRouter } from "next/router";

interface ClaimHBTProps {
  disabled: boolean;
}

const ClaimHBTButton: React.FC<ClaimHBTProps> = ({ disabled = false }) => {
  const hbtContract = useHBTContract();
  const router = useRouter();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const [{ isMining, txHash }, setIsMining] = useState({
    isMining: false,
    txHash: "",
  });

  const onClaimClick = async () => {
    if (chain?.id !== Web3ChainReference.EIP155_HARDHAT_LOCAL) {
      router.push("https://sandbox.humanbound.xyz/");
      return;
    }

    try {
      if (!hbtContract) throw new Error("hbtContract is undefined");
      if (!address) throw new Error("connected address is undefined");

      const res = await hbtContract.safeMint(address, generateRandomTokenId());
      setIsMining({ isMining: true, txHash: res.hash });
      await res.wait();
    } catch (error: any) {
      console.error(error);
      displayToast(error.data?.message || error.message);
    } finally {
      setIsMining({ isMining: false, txHash: "" });
    }
  };

  return (
    <>
      <button
        onClick={onClaimClick}
        className={disabled ? "disabled-btn" : "green-btn"}
        disabled={disabled}
      >
        {disabled ? "Claimed!" : "Claim"}
      </button>
      <Mining isMining={isMining} txHash={txHash} />
    </>
  );
};

export default ClaimHBTButton;
