import React from "react";
import { formatToDisplayAddress } from "src/utils";
import {
  Registration,
  isAddressNotRegistered,
  RegistrationRegistered,
} from "../../../shared";

export type ClaimBoxProps = {
  registration: Registration | null;
  account: string;
  hasClaimed: boolean | null;
  onClaim: () => void;
};

export const ClaimBox = ({
  registration,
  account,
  hasClaimed,
  onClaim,
}: ClaimBoxProps) => {
  if (registration == null) {
    return null;
  }

  if (isAddressNotRegistered(registration)) {
    return <p> {account} is not registered for the airdrop.</p>;
  }

  const { isRegistered, amount } = registration as RegistrationRegistered;

  if (isRegistered && amount) {
    if (hasClaimed == null) {
      return <p>Sorry, something went wrong.</p>;
    }

    return (
      <div>
        {hasClaimed == true ? (
          <p>
            The address you are connected with -{" "}
            <span className="text-yellow-500">
              {formatToDisplayAddress(account)}
            </span>{" "}
            - already claimed its airdrop.
          </p>
        ) : (
          <>
            <p className="mb-4">
              🚀 Your address qualifies for {amount} tokens. 🚀
            </p>
            <button className="green-btn" onClick={() => onClaim()}>
              Claim
            </button>
          </>
        )}
      </div>
    );
  }

  return <p>Sorry, something went wrong.</p>;
};
