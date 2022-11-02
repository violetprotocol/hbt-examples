import React from "react";
import { ClaimBox } from "src/components/Claim";
import { useAidrop } from "src/hooks/useAirdrop";

export default function Claim() {
  const { account, registration, hasClaimed, claimAirdrop } = useAidrop();

  return (
    <div className="text-center">
      <h1 className="text-2xl my-4">Claim your airdrop</h1>
      {!account ? (
        "Please connect your wallet"
      ) : (
        <ClaimBox
          registration={registration}
          account={account}
          hasClaimed={hasClaimed}
          onClaim={claimAirdrop}
        />
      )}
    </div>
  );
}
