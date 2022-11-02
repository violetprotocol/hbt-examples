import { useState, useEffect, useContext, useCallback } from "react";
import {
  isAddressNotRegistered,
  Registration,
  RegistrationRegistered,
  sharedConfig,
} from "../../../shared";
import { Web3Context } from "src/context/Web3Context";
import { isAddressRegistered } from "src/services/registration";
import { Contract, ethers } from "ethers";
import {
  ERC20MerkleDrop,
  ERC20MerkleDrop__factory,
} from "../../lib/typechain-types";
import { verifyAddressIsASmartContract } from "src/utils";

export const useAidrop = () => {
  const { account, signer } = useContext(Web3Context);
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [hasClaimed, setHasClaimed] = useState<boolean | null>(null);
  const [merkleDropContract, setMerkleDropContract] = useState<Contract | null>(
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

  useEffect(() => {
    if (account) {
      getRegistration();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  const checkIfClaimed = useCallback(async () => {
    const index = (registration as RegistrationRegistered)?.index;

    const hasClaimed = await (merkleDropContract as ERC20MerkleDrop).isClaimed(
      index
    );

    setHasClaimed(hasClaimed);
  }, [registration, merkleDropContract]);

  useEffect(() => {
    if (
      !registration ||
      isAddressNotRegistered(registration) ||
      !merkleDropContract
    ) {
      return;
    }

    checkIfClaimed();
  }, [merkleDropContract, account, registration, checkIfClaimed]);

  const claimAirdrop = useCallback(async () => {
    if (registration == null || isAddressNotRegistered(registration)) {
      console.log("Trying to claim but registration is not valid.");
      return;
    }
    const { address, amount, proof } = registration;
    console.log(
      `Redeeming with address: ${address}, amount: ${amount}, proof: ${proof}.`
    );
    const tx = await (merkleDropContract as ERC20MerkleDrop).redeem(
      address,
      amount,
      proof
    );
    await tx.wait();

    checkIfClaimed();
  }, [merkleDropContract, registration, checkIfClaimed]);

  return { account, registration, hasClaimed, claimAirdrop } as const;
};
