import React from "react";
import MintCERC20Button from "src/components/MintCERC20Button";
import { useAccount } from "wagmi";
import { useHasHBT } from "src/hooks/useHasHBT";

export default function Mint() {
  const { address } = useAccount();
  const hasHBT = useHasHBT(address);

  return (
    <div className="text-center">
      <h1 className="text-center text-2xl mb-12">Mint cERC20</h1>

      <h2 className="text-md mb-16">
        Humanbound token holders can claim some compliant ERC20 tokens
      </h2>

      {hasHBT ? (
        <MintCERC20Button />
      ) : (
        "Connected account does not own a Humanbound token"
      )}
    </div>
  );
}
