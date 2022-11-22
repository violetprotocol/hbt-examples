import { useContext, useState } from "react";
import { Web3Context } from "src/context/Web3Context";
import { Mining } from "src/helpers/Mining";
import { useERC20Balance } from "src/hooks/useERC20Balance";
import { displayToast } from "src/utils/toast";

const ClaimERC20: React.FC = () => {
  const { account, erc20Contract } = useContext(Web3Context);
  const balance = useERC20Balance(account);
  const [{ isMining, txHash }, setIsMining] = useState({
    isMining: false,
    txHash: "",
  });

  const onClaimClick = async () => {
    try {
      const res = await erc20Contract.mint(account, 10);
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
      <h2>ERC20 Balance: {balance?.toNumber() || 0}</h2>
      <br />
      <button
        onClick={onClaimClick}
        className={isMining ? "disabled-btn" : "green-btn"}
        disabled={isMining}
      >
        {isMining ? "Claiming..." : "Claim"}
      </button>
      <Mining isMining={isMining} txHash={txHash} />
    </>
  );
};

export default ClaimERC20;