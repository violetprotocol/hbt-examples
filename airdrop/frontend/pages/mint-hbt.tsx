import { BigNumber } from "ethers";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Web3Context } from "src/context/Web3Context";
import { useHbtBalance } from "src/hooks/useHbtBalance";
import { generateRandomTokenId } from "src/utils";

export default function Mint() {
  const { account, contract } = useContext(Web3Context);
  const { hbtBalance, getBalance } = useHbtBalance(contract, account);

  const mintHBT = useCallback(async () => {
    try {
      const res = await contract.safeMint(account, generateRandomTokenId());
      await res.wait();
    } catch (error) {
      console.error(error);
    }
    getBalance();
  }, [account, contract, getBalance]);

  const renderBalance = (
    hbtBalance: BigNumber | undefined,
    account: string
  ) => {
    if (!hbtBalance) {
      return <p>Cannot query HBT balance</p>;
    }

    if (hbtBalance._isBigNumber && hbtBalance.eq(0)) {
      return (
        <button className="blue-btn" onClick={() => mintHBT()}>
          Mint
        </button>
      );
    }

    if (hbtBalance._isBigNumber && hbtBalance.gt(0)) {
      return <p>{account} already owns an HBT</p>;
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl my-4">Mint a HBT</h1>
      {!account
        ? "Please connect your wallet"
        : renderBalance(hbtBalance, account)}
    </div>
  );
}
