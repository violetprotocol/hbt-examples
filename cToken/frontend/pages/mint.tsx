import React, { useContext, useState } from "react";
import MintCERC20Button from "src/components/MintCERC20Button";
import { Web3Context } from "src/context/Web3Context";
import { Mining } from "src/helpers/Mining";
import { usecERC20Balance } from "src/hooks/usecERC20Balance";
import { useHasHBT } from "src/hooks/useHBT";

export default function Mint() {
  const { account } = useContext(Web3Context);
  const hasHBT = useHasHBT(account);

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
