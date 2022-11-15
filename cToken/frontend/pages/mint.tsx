import React, { useContext, useState } from "react";
import { Web3Context } from "src/context/Web3Context";
import { Mining } from "src/helpers/Mining";
import { usecERC20Balance } from "src/hooks/usecERC20Balance";
import { useHasHBT } from "src/hooks/useHBT";

export default function Mint() {
  const { account, cerc20Contract } = useContext(Web3Context);
  const hbtMinted = useHasHBT(account);
  const cerc20Balance = usecERC20Balance(account);
  const [{ isMining, txHash }, setIsMining] = useState({
    isMining: false,
    txHash: "",
  });
  console.log(cerc20Balance);

  const onMintClick = async () => {
    const res = await cerc20Contract.mint(account, 10);
    setIsMining({ isMining: true, txHash: res.hash });
    try {
      await res.wait();
    } catch (error) {
      console.error(error);
    } finally {
      setIsMining({ isMining: false, txHash: "" });
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-center text-2xl mb-12">Mint cERC20</h1>

      <h2 className="text-md mb-16">
        Humanbound token holders can claim some compliant ERC20 tokens
      </h2>

      {hbtMinted ? (
        <button onClick={onMintClick} className="green-btn">
          Claim
        </button>
      ) : (
        "Connected account does not own a Humanbound token"
      )}

      <Mining isMining={isMining} txHash={txHash} />
    </div>
  );
}
