import { BigNumber } from "ethers";
import React from "react";
import { SendCERC20 } from "src/components/SendCERC20";

export default function Send() {
  return (
    <div className="text-center">
      <h1 className="text-2xl my-4">Trade your compliant tokens!</h1>
      <h2 className="text-md mb-16">
        This page allows you to transfer cERC20 tokens to other accounts
      </h2>
      <SendCERC20 />
    </div>
  );
}
