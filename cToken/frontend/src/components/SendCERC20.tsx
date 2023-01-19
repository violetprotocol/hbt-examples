import { BigNumber } from "ethers";
import { useContext, useState } from "react";
import { useAccount } from "wagmi";
import { Mining } from "src/helpers/Mining";
import { usecERC20Balance } from "src/hooks/usecERC20Balance";
import { displayToast } from "src/utils/toast";
import { usecERC20Contract } from "src/hooks/usecERC20Contract";
import { useHBTContract } from "src/hooks/useHBTContract";

export const SendCERC20: React.FC = () => {
  const { address } = useAccount();
  const cerc20Contract = usecERC20Contract();
  const hbtContract = useHBTContract();
  const balance = usecERC20Balance(address);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [validRecipient, setValidRecipient] = useState<boolean>(false);
  const [{ isMining, txHash }, setIsMining] = useState({
    isMining: false,
    txHash: "",
  });

  const handleAddressValidation = async (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const value = event.currentTarget.value;
    if (value.length != 42) {
      setValidRecipient(false);
      setRecipient("");
    } else if (value.length == 42) {
      setRecipient(value);
      try {
        if (!hbtContract) throw new Error("hbtContract is undefined");
        const recipientHBTBalance = await hbtContract.callStatic.balanceOf(
          value
        );
        setValidRecipient(recipientHBTBalance.gt(0));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleAmountValidation = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    try {
      const val = parseInt(value, 10);
      setAmount(val);
    } catch (error) {
      console.error("attempted to input non-numbers");
      setAmount(0);
    }
  };

  const onTransferClick = async () => {
    try {
      if (!cerc20Contract) throw new Error("cerc20Contract is undefined");
      const res = await cerc20Contract.transfer(
        recipient,
        BigNumber.from(amount)
      );
      setIsMining({ isMining: true, txHash: res.hash });
      await res.wait();
    } catch (error: any) {
      console.error(error);
      displayToast(error?.data?.message || error?.message);
    } finally {
      setIsMining({ isMining: false, txHash: "" });
    }
  };

  const enoughFunds = BigNumber.from(amount).lte(balance || 0);

  const readyToTransfer =
    enoughFunds && amount > 0 && validRecipient && !isMining;

  return (
    <>
      Recipient address:
      <input
        className="input"
        id="address"
        onChange={handleAddressValidation}
        value={recipient}
        placeholder="0x1234"
      />
      {!validRecipient && recipient && (
        <p className="inputErr">Recipient does not hold a Humanbound token</p>
      )}
      <br />
      Amount:
      <input
        type={"number"}
        className="input"
        id="amount"
        onChange={handleAmountValidation}
        value={amount}
        placeholder="10"
      />
      {!enoughFunds && <p className="inputErr">Insufficient funds</p>}
      <br />
      <button
        onClick={onTransferClick}
        className={readyToTransfer ? "green-btn" : "disabled-btn"}
        disabled={!readyToTransfer}
      >
        Transfer
      </button>
      <Mining isMining={isMining} txHash={txHash} />
    </>
  );
};
