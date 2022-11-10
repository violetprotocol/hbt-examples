import { useCallback, useEffect, useState } from "react";
import { isAddressRegistered as isRegistered } from "src/services/registration";
import { EthAddress, Registration } from "../../../shared";

// Return the Registration info and whether an address is registered for the airdrop
export const useIsRegistered = (address: EthAddress) => {
  const [registration, setRegistration] = useState<Registration | null>(null);

  const checkIfRegistered = useCallback(() => {
    return isRegistered(address)
      .then((response) => setRegistration(response))
      .catch((err) => console.error(err));
  }, [address]);

  useEffect(() => {
    if (typeof address !== "string") return;
    checkIfRegistered();
  }, [address, checkIfRegistered]);

  return { registration, checkIfRegistered };
};
