import Head from "next/head";
import { useContext } from "react";
import { useAccount } from "wagmi";
import { usecERC20Balance } from "src/hooks/usecERC20Balance";
import { BigNumber, ethers } from "ethers";

const CERCBalance: React.FC = () => {
  const { address } = useAccount();
  const balance = usecERC20Balance(address);
  const balanceDecimalShifted = BigNumber.from(
    parseInt(ethers.utils.formatEther(balance || 0))
  );

  return (
    <>
      {address && (
        <div className="py-3">
          Balance: {balanceDecimalShifted.toString()} CERC
        </div>
      )}
    </>
  );
};

export default CERCBalance;
