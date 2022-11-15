import Head from "next/head";
import { useContext } from "react";
import { Web3Context } from "src/context/Web3Context";
import { usecERC20Balance } from "src/hooks/usecERC20Balance";

const CERCBalance: React.FC = () => {
  const { account } = useContext(Web3Context);
  const balance = usecERC20Balance(account);

  return (
    <>
      {account && (
        <div className="py-3">Balance: {balance?.toString()} CERC</div>
      )}
    </>
  );
};

export default CERCBalance;
