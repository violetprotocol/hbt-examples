import Head from "next/head";
import { useContext } from "react";
import { Web3Context } from "src/context/Web3Context";
import { usecERC20Balance } from "src/hooks/usecERC20Balance";

const CERCBalance: React.FC = () => {
  const { account } = useContext(Web3Context);
  const cerc20Balance = usecERC20Balance(account);

  return (
    <>
      {account && (
        <div className="py-3">Balance: {cerc20Balance?.toString()} CERC</div>
      )}
    </>
  );
};

export default CERCBalance;
