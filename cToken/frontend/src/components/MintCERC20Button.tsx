import { useContext, useState } from "react";
import { Web3Context } from "src/context/Web3Context";
import { Mining } from "src/helpers/Mining";
import { displayToast } from "src/utils/toast";

const MintCERC20Button: React.FC = () => {
  const { account, cerc20Contract } = useContext(Web3Context);
  const [{ isMining, txHash }, setIsMining] = useState({
    isMining: false,
    txHash: "",
  });

  const onMintClick = async () => {
    try {
      const res = await cerc20Contract.mint(account, 10);
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
      <button onClick={onMintClick} className="green-btn">
        Mint
      </button>
      <Mining isMining={isMining} txHash={txHash} />
    </>
  );
};

export default MintCERC20Button;
