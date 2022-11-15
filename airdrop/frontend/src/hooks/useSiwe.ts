import { Signer } from "ethers";
import { useCallback } from "react";
import { SiweMessage } from "siwe";
import { BACKEND_ENDPOINTS } from "src/config/endpoints";

let domain: string;
let origin: string;
if (typeof window !== "undefined") {
  domain = window.location.host;
  origin = window.location.origin;
}

async function createSiweMessage(address: string, statement: string) {
  if (!domain || !origin)
    throw new Error("Missing config to create a SIWE message");

  const res = await fetch(BACKEND_ENDPOINTS.siweNonce, {
    credentials: "include",
  });

  const expiry = new Date(Date.now());
  expiry.setMinutes(expiry.getMinutes() + 5);
  const expirationTime = expiry.toISOString();

  const message = new SiweMessage({
    domain,
    address,
    statement,
    uri: origin,
    version: "1",
    chainId: 1,
    nonce: await res.text(),
    expirationTime,
  });
  return message.prepareMessage();
}

export const useSiwe = (signer: Signer) => {
  const signInWithEthereum = useCallback(async () => {
    try {
      const message = await createSiweMessage(
        await signer.getAddress(),
        "Sign in with Ethereum to this HBT airdrop example app."
      );
      const signature = await signer.signMessage(message);

      const res = await fetch(BACKEND_ENDPOINTS.siweVerify, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, signature }),
        credentials: "include",
      });

      return res.json();
    } catch (error) {
      console.error("Error while trying to sign in with Ethereum.");
      console.error(error);
    }
  }, [signer]);

  return [signInWithEthereum];
};
