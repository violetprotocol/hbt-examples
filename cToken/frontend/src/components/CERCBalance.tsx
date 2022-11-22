import Head from "next/head";
import { useContext } from "react";
import { useAccount } from "wagmi";
import { usecERC20Balance } from "src/hooks/usecERC20Balance";

const CERCBalance: React.FC = () => {
  const { address } = useAccount();
  const balance = usecERC20Balance(address);

  return (
    <>
      {address && (
        <div className="py-3">Balance: {balance?.toString()} CERC</div>
      )}
    </>
  );
};

export default CERCBalance;
