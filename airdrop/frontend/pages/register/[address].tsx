import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Steps, { Step, StepStatus } from "src/components/steps";
import { Web3Context } from "src/context/Web3Context";
import { useSiwe } from "src/hooks/useSiwe";
import { registerAddress } from "src/services/registration";
import { displayToast } from "src/utils/toast";

const stepsInitialState: Step[] = [
  {
    name: "Proof of Humanbound Token Ownership",
    description: "Sign-in with an address holding an HBT",
    href: "#",
    status: StepStatus.IN_PROGRESS,
  },
  {
    name: "Sign a message with the address to register",
    description: "Confirm the registration of the eligible address",
    href: "#",
    status: StepStatus.NOT_STARTED,
  },
];
export default function Register() {
  const { account, signer } = useContext(Web3Context);
  const [signInWithEthereum] = useSiwe(signer);
  const router = useRouter();
  const { address: addressToRegister } = router.query;
  const [steps, setSteps] = useState(stepsInitialState);
  const isFirstStep = steps[0].status == StepStatus.IN_PROGRESS;
  const isSecondStep = steps[1].status == StepStatus.IN_PROGRESS;
  const isLastStep = steps[1].status == StepStatus.COMPLETE;
  const [
    isConnectedWithAddressToRegister,
    setIsConnectedWithAddressToRegister,
  ] = useState<boolean | null>(null);
  const [registeredAddress, setRegisteredAddress] = useState("");

  const onSignIn = async () => {
    const result = await signInWithEthereum();
    if (result.isSignedIn) {
      setSteps((steps) => [
        { ...steps[0], status: StepStatus.COMPLETE },
        { ...steps[1], status: StepStatus.IN_PROGRESS },
      ]);
    } else {
      displayToast("Oops, an error occured.", { type: "error" });
    }
  };

  const onRegister = async () => {
    if (typeof addressToRegister != "string") {
      throw new Error("The address to register is invalid");
    }

    const registeredAddress = await registerAddress({
      addressToRegister,
      signer,
    });

    if (typeof registeredAddress == "string") {
      setRegisteredAddress(registeredAddress);
    }

    setSteps((steps) => [
      steps[0],
      { ...steps[1], status: StepStatus.COMPLETE },
    ]);
  };

  useEffect(() => {
    console.log("account", account);
    console.log("addressToRegister", addressToRegister);
    if (
      account &&
      typeof addressToRegister == "string" &&
      account.toLowerCase() === addressToRegister.toLowerCase()
    ) {
      setIsConnectedWithAddressToRegister(true);
    } else {
      setIsConnectedWithAddressToRegister(false);
    }
  }, [account, addressToRegister]);

  return (
    <div className="text-center">
      <h1 className="text-2xl my-4">Airdrop registration</h1>
      <p className="mb-6">
        Address to register:{" "}
        <span className="text-green-500">{addressToRegister}</span>
      </p>
      <div className="max-w-[70%] border-2 p-4 rounded-lg m-auto flex items-center">
        <div className="min-w-[40%]">
          <Steps steps={steps} />
        </div>
        <div className="w-[70%]">
          {isFirstStep && (
            <div className="bg-sky-400">
              {signer ? (
                <button className="green-btn" onClick={onSignIn}>
                  Sign in
                </button>
              ) : (
                "Please connect an address which owns a Humanbound Token."
              )}
            </div>
          )}
          {isSecondStep && (
            <div className="bg-teal-500">
              {isConnectedWithAddressToRegister ? (
                <button className="green-btn" onClick={onRegister}>
                  Register
                </button>
              ) : (
                <p>Please connect with {addressToRegister}</p>
              )}
            </div>
          )}
          {isLastStep && registeredAddress && (
            <p>
              <span className="text-green-500">{registeredAddress}</span> has
              been registered for the airdrop! 🎉
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
