import { useContext, useState } from "react";
import { useAccount } from "wagmi";
import { Mining } from "src/helpers/Mining";
import { useERC20Balance } from "src/hooks/useERC20Balance";
import { displayToast } from "src/utils/toast";
import { useERC20Contract } from "src/hooks/useERC20Contract";

const ClaimERC20: React.FC = () => {
  const { address } = useAccount();
  const erc20Contract = useERC20Contract();
  const balance = useERC20Balance(address);
  const [{ isMining, txHash }, setIsMining] = useState({
    isMining: false,
    txHash: "",
  });

  const onClaimClick = async () => {
    try {
      if (!erc20Contract) throw new Error("erc20Contract is undefined");
      if (!address) throw new Error("connected address is undefined");

      const res = await erc20Contract.mint(address, 10);
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
