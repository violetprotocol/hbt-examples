import { ethers } from "ethers";
import { useCallback, useContext, useState } from "react";
import { useAccount } from "wagmi";
import { Mining } from "src/helpers/Mining";
import { usecERC20Balance } from "src/hooks/usecERC20Balance";
import { useERC20Allowance } from "src/hooks/useERC20Allowance";
import { displayToast } from "src/utils/toast";
import { useERC20Contract } from "src/hooks/useERC20Contract";
import { usecERC20Contract } from "src/hooks/usecERC20Contract";

const WrapERC20: React.FC = () => {
  const { address } = useAccount();
  const erc20Contract = useERC20Contract();
  const cerc20Contract = usecERC20Contract();
  const cerc20balance = usecERC20Balance(address);
  const allowance = useERC20Allowance();
  const [amount, setAmount] = useState(0);
  const [{ isMining, txHash }, setIsMining] = useState({
    isMining: false,
    txHash: "",
  });

  const mineTransaction = useCallback(
    async (
      func: (...args: any) => Promise<ethers.ContractTransaction>,
      ...params: any
    ) => {
      try {
        const res = await func(...params);
        setIsMining({ isMining: true, txHash: res.hash });
        await res.wait();
      } catch (error: any) {
        console.error(error);
        displayToast(error?.data?.message || error?.message);
      } finally {
        setIsMining({ isMining: false, txHash: "" });
      }
    },
    []
  );

  const onApproveClick = async () => {
    if (!erc20Contract) throw new Error("erc20Contract is undefined");
    if (!cerc20Contract) throw new Error("cerc20Contract is undefined");

    await mineTransaction(
      erc20Contract.approve,
      cerc20Contract.address,
      ethers.constants.MaxUint256
    );
  };

  const onWrapClick = async () => {
    if (!cerc20Contract) throw new Error("cerc20Contract is undefined");
    await mineTransaction(cerc20Contract.wrap, amount);
  };

  const onUnwrapClick = async () => {
    if (!cerc20Contract) throw new Error("cerc20Contract is undefined");
    await mineTransaction(cerc20Contract.unwrap, amount);
  };

  const handleAmount = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    try {
      const val = parseInt(value, 10);
      setAmount(val);
    } catch (error) {
      console.error("attempted to input non-numbers");
      setAmount(0);
    }
  };

  const isApproved = allowance?.gt(0);

  return (
    <>
      <h2>cERC20 Balance: {cerc20balance?.toNumber() || 0}</h2>
      {isApproved ? (
        <>
          <input
            type="number"
            className="input"
            id="address"
            onChange={handleAmount}
            value={amount}
            placeholder="10"
          />
          <button
            onClick={onWrapClick}
            className={isMining ? "disabled-btn" : "green-btn"}
            disabled={isMining}
          >
            {isMining ? "Wrapping..." : "Wrap ERC20"}
          </button>
          <br />
          <button
            onClick={onUnwrapClick}
            className={isMining ? "disabled-btn" : "green-btn"}
            disabled={isMining}
          >
            {isMining ? "Unwrapping..." : "Unwrap cERC20"}
          </button>
        </>
      ) : (
        <>
          <br />
          <button
            onClick={onApproveClick}
            className={isMining ? "disabled-btn" : "green-btn"}
            disabled={isMining}
          >
            {isMining ? "Approving..." : "Approve ERC20"}
          </button>
        </>
      )}
      <Mining isMining={isMining} txHash={txHash} />
    </>
  );
};

export default WrapERC20;
