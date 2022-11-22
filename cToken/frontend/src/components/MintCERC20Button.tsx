import { useContext, useState } from "react";
import { useAccount } from "wagmi";
import { Mining } from "src/helpers/Mining";
import { displayToast } from "src/utils/toast";
import { usecERC20Contract } from "src/hooks/usecERC20Contract";

const MintCERC20Button: React.FC = () => {
  const { address } = useAccount();
  const cerc20Contract = usecERC20Contract();
  const [{ isMining, txHash }, setIsMining] = useState({
    isMining: false,
    txHash: "",
  });

  const onMintClick = async () => {
    try {
      if (!cerc20Contract) throw new Error("cerc20Contract is undefined");
      if (!address) throw new Error("connected address is undefined");

      const res = await cerc20Contract.mint(address, 10);
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
