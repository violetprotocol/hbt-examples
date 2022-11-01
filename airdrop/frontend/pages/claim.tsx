import React, { useCallback, useContext, useEffect, useState } from "react";
import { Web3Context } from "src/context/Web3Context";
import { isAddressRegistered } from "src/services/registration";
import { Registration } from "../../shared";

export default function Claim() {
  const { account } = useContext(Web3Context);
  const [registration, setRegistration] = useState<Registration | null>(null);

  const getRegistration = useCallback(async () => {
    if (!account) return;

    try {
      const registration = await isAddressRegistered(account);
      setRegistration(registration);
    } catch (error) {
      console.error(error);
    }
  }, [account]);

  useEffect(() => {
    getRegistration();
  }, [getRegistration]);

  const renderRegistration = (
    registration: Registration | null,
    account: string
  ) => {
    if (!registration) {
      return;
    }

    if (!registration.isRegistered) {
      return <p> {account} is not registered for the airdrop.</p>;
    }

    if (registration.isRegistered && registration.amount) {
      return (
        <div>
          <p className="mb-4">
            🚀 Your address qualifies for {registration.amount} tokens. 🚀
          </p>
          <button className="green-btn" onClick={() => console.log("Claiming")}>
            Claim
          </button>
        </div>
      );
    }

    return <p>Sorry, something went wrong.</p>;
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl my-4">Claim your airdrop</h1>
      {!account
        ? "Please connect your wallet"
        : renderRegistration(registration, account)}
    </div>
  );
}
