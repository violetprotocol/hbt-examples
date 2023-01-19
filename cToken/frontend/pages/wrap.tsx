import React from "react";
import ClaimERC20 from "src/components/ClaimERC20";
import WrapERC20 from "src/components/WrapERC20";

export default function Wrap() {
  return (
    <div className="text-center">
      <h1 className="text-center text-2xl mb-12">ERC20 → cERC20</h1>
      <h1 className="text-center text-xl mb-12">
        Wrap non-compliant ERC20 and receive compliant cERC20
      </h1>

      <h2 className="text-md mb-16">
        Normal ERC20 tokens that are permissionless, are also not compliant.
        Popular tokens such as USDC will need to be converted to a compliant
        cUSDC by being wrapped in order for it to become compliant.
      </h2>

      <h2 className="text-md mb-16">
        Claim some ERC20 tokens and convert them to cERC20 through wrapping
        below.
      </h2>

      <div className="row">
        <div className="column">
          <ClaimERC20 />
        </div>
        <div className="column">
          <WrapERC20 />
        </div>
      </div>
    </div>
  );
}
