import Head from "next/head";
import { useContext, useState } from "react";
import { Web3Context } from "src/context/Web3Context";
import { Mining } from "src/helpers/Mining";
import { useHasHBT } from "src/hooks/useHasHBT";
import { generateRandomTokenId } from "src/utils";
import { displayToast } from "src/utils/toast";

interface ClaimHBTProps {
  disabled: boolean;
}

const ClaimHBTButton: React.FC<ClaimHBTProps> = ({ disabled = false }) => {
  const { account, hbtContract } = useContext(Web3Context);
  const [{ isMining, txHash }, setIsMining] = useState({
    isMining: false,
    txHash: "",
  });

  const onClaimClick = async () => {
    try {
      const res = await hbtContract.safeMint(account, generateRandomTokenId());
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
