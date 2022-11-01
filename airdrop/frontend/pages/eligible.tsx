import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getEligility } from "src/services/eligibility";
import { isAddressRegistered } from "src/services/registration";
import { sharedConfig } from "../../shared";

const INITIAL_MESSAGE = "Enter your address above";
const INVALID_ADDRESS = "Please enter a valid address";

export default function Eligible() {
  const [inputValue, setinputValue] = useState("");
  const [addressToCheck, setAddressToCheck] = useState("");
  const [message, setMessage] = useState(INITIAL_MESSAGE);
  const [isAddressEligible, setIsAddressEligible] = useState(false);
  const [isAddressAlreadyRegistered, setIsAddressAlreadyRegistered] = useState<
    null | boolean
  >(null);
  const router = useRouter();

  const handleAddressToCheck = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setinputValue(value);
    if (value.length != 42 && message != INVALID_ADDRESS) {
      setMessage(INVALID_ADDRESS);
      setIsAddressEligible(false);
    } else if (value.length == 42) {
      setAddressToCheck(value);
      setMessage("");
    }
  };

  useEffect(() => {
    if (!addressToCheck) return;

    getEligility(addressToCheck)
      .then((res) => res.json())
      .then(
        (response) => {
          const amount = response?.tokenAmount;
          if (amount) {
            setMessage(
              `🎉🎉🎉 Congratulations! This address is entitled to ${amount} tokens! 🎉🎉🎉`
            );
            setIsAddressEligible(true);
          }
        },
        (error) => {
          console.error(error);
          setMessage("An error occured");
        }
      );
  }, [addressToCheck]);

  useEffect(() => {
    if (!addressToCheck) return;

    isAddressRegistered(addressToCheck)
      .then((response) => setIsAddressAlreadyRegistered(response.isRegistered))
      .catch((err) => console.error(err));
  }, [addressToCheck]);

  const onRegisterClick = () => {
    router.push(`/register/${addressToCheck}`);
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl my-4">Register for the airdrop</h1>
      <h2 className="text-xl my-4">How many tokens are you eligible for?</h2>
      <form className="flex flex-col items-center">
        <input
          className="eligible-address-input"
          type="email"
          id="address"
          onChange={handleAddressToCheck}
          value={inputValue}
          placeholder="0x1234"
        />
        <label
          className="block text-gray-200 text-lg font-bold mt-6"
          htmlFor="address"
        >
          {message}
        </label>
      </form>
      {isAddressEligible ? (
        isAddressAlreadyRegistered ? (
          <p className="mt-6">
            {addressToCheck} is already registered. Please come back when
            it&apos;s time to claim!
          </p>
        ) : (
          <div className="mt-8">
            <h3 className="text-xl mb-4">
              Register this address to claim the airdrop.
            </h3>
            <h4>
              ⚠️ You can only register{" "}
              {sharedConfig.maximumNumberOfAddressesOneCanRegister} addresses.
              Pick them wisely! ⚠️
            </h4>
            <button className="green-btn mt-4" onClick={onRegisterClick}>
              Register
            </button>
          </div>
        )
      ) : null}
    </div>
  );
}
