import { useState, useEffect, useContext, useCallback } from "react";
import {
  isAddressNotRegistered,
  MerkleDetails,
  RegistrationRegistered,
  sharedConfig,
} from "../../../shared";
import { Web3Context } from "src/context/Web3Context";
import { fetchMerkleDetails } from "src/services/registration";
import { BigNumber, Contract, ethers } from "ethers";
import {
  ERC20MerkleDrop,
  ERC20MerkleDrop__factory,
} from "../../lib/typechain-types";
import { verifyAddressIsASmartContract } from "src/utils";
import { useIsRegistered } from "./useIsRegistered";
import { hasAddressClaimed } from "src/services/claim";

export const useAidrop = () => {
  const { account, signer } = useContext(Web3Context);
  const { registration, checkIfRegistered } = useIsRegistered(account);
  const [hasClaimed, setHasClaimed] = useState<boolean | null>(null);
  const [merkleDropContract, setMerkleDropContract] = useState<Contract | null>(
    null
  );
  const [merkleDetails, setMerkleDetails] = useState<MerkleDetails | null>(
    null
  );

  useEffect(() => {
    if (!signer) return;

    const getMerkleDropContract = async (): Promise<Contract | null> => {
      const contractAddress = sharedConfig.merkleDropContractAddress;

      const isContract = await verifyAddressIsASmartContract(
        contractAddress,
        signer
      );

      if (!isContract) return null;

      return new ethers.Contract(
        contractAddress,
        ERC20MerkleDrop__factory?.abi,
        signer
      );
    };

    getMerkleDropContract().then((contract) => {
      if (!contract) {
        console.error("Could not instantiate Merkle Drop contract.");
        return;
      }
      setMerkleDropContract(contract);
    });
  }, [signer, account]);

  useEffect(() => {
    if (account) {
      checkIfRegistered();
    }
    // Check if address is registered on first render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMerkleDetails = useCallback(async () => {
    if (!registration || isAddressNotRegistered(registration)) {
      return;
    }
    console.log("registration", registration);
    try {
      const result = await fetchMerkleDetails(
        (registration as RegistrationRegistered).address,
        (registration as RegistrationRegistered).amount
      );
      setMerkleDetails(result);
    } catch (error) {
      console.error(error);
    }
  }, [registration]);

  useEffect(() => {
    getMerkleDetails();
  }, [getMerkleDetails, registration]);

  const checkIfClaimed = useCallback(async () => {
    if (!merkleDropContract || !account) return;

    const hasClaimed = await hasAddressClaimed(
      merkleDropContract as ERC20MerkleDrop,
      account
    );
    if (hasClaimed == null) {
      console.error("Failed to verify if address has claimed.");
    }
    console.log(account, "hasClaimed", hasClaimed);
    setHasClaimed(hasClaimed);
  }, [account, merkleDropContract]);

  useEffect(() => {
    if (
      !registration ||
      isAddressNotRegistered(registration) ||
      !merkleDetails ||
      !merkleDropContract
    ) {
      return;
    }

    checkIfClaimed();

    return () => {
      setHasClaimed(null);
    };
  }, [
    merkleDropContract,
    account,
    registration,
    checkIfClaimed,
    merkleDetails,
  ]);

  const claimAirdrop = useCallback(async () => {
    if (
      registration == null ||
      isAddressNotRegistered(registration) ||
      !merkleDetails
    ) {
      console.log("Trying to claim without merkle proof.");
      return;
    }
    const { address, scaledAmount } = registration;
    const { proof } = merkleDetails;
    console.log(
      `Claiming with address: ${address}, scaledAmount: ${scaledAmount}, proof: ${proof}.`
    );

    const bigNumberAmount = BigNumber.from(scaledAmount);
    const tx = await(merkleDropContract as ERC20MerkleDrop).claim(
      address,
      bigNumberAmount,
      proof
    );

    await tx.wait();

    await checkIfClaimed();
  }, [registration, merkleDetails, merkleDropContract, checkIfClaimed]);

  return { account, registration, hasClaimed, claimAirdrop } as const;
};
