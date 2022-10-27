import { useContext, Dispatch, SetStateAction } from "react";
import { Web3Context } from "../Web3Context";
import { Web3Provider } from "@ethersproject/providers";
import { MockHBT, MockHBT__factory } from "lib/typechain-types/index";
import { ethers } from "ethers";
import { displayToast, toastInfo } from "src/utils/toast";

declare let window: any;

export interface Web3 {
  contract: MockHBT;
  provider: Web3Provider;
  account: string;
  setWeb3?: Dispatch<SetStateAction<Web3>>;
}

export const MetaMask = () => {
  const { account, setWeb3 } = useContext(Web3Context);

  async function enableEth() {
    const ethereum = window.ethereum;
    try {
      if (ethereum) {
        const provider = new Web3Provider(ethereum);
        const [address] = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const chainId = await ethereum.request({ method: "eth_chainId" });

        let contractAddress: string;
        switch (chainId) {
          case "0x1": // Mainnet
            contractAddress = "";
            break;
          case "0x3": // Ropsten
            contractAddress = "";
            break;
          case "0x4": // Rinkeby
            contractAddress = "";
            break;
          case "0x89": // Polygon Mainnet
            contractAddress = "";
            break;
          case "0x13881": // Polygon Testnet
            contractAddress = "";
            break;
          default:
            // Hardhat Local
            contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        }

        const signer = provider.getSigner(address);
        const account = signer._address;

        let code;
        try {
          code = await signer.provider.getCode(contractAddress, "latest");
          if (code == "0x") {
            console.error(
              `There is no code at ${contractAddress}. Please verify that the HBT contract was deployed at this address.`
            );
            displayToast(
              "The HBT contract address provided does not correspond to a smart contract.",
              {
                type: "error",
              }
            );
          }
        } catch (error) {
          console.log("error", error);
        }

        const contract = new ethers.Contract(
          contractAddress,
          MockHBT__factory.abi,
          signer
        ) as MockHBT;

        console.log(
          `Contract connected: ${
            contract.address
          } on chain ${chainId} with signer ${await contract.signer.getAddress()}`
        );

        setWeb3 &&
          setWeb3((prev: Web3) => ({
            ...prev,
            contract,
            provider,
            account,
          }));
      } else if (window.web3) {
        console.log("Update MetaMask");
      } else {
        console.log("Enable MetaMask");
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="py-3">
      {!account ? (
        <button className="metamask-btn" onClick={enableEth}>
          Connect Wallet
        </button>
      ) : (
        <button
          className="blue-btn"
          onClick={() => displayToast(`Your wallet address is: ${account}`)}
        >
          Wallet Connected
        </button>
      )}
    </div>
  );
};
