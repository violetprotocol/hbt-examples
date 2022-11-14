import React, { useContext } from "react";
import { Web3Context } from "src/context/Web3Context";

export default function Mint() {
  const { account } = useContext(Web3Context);

  return <div className="text-center"></div>;
}
