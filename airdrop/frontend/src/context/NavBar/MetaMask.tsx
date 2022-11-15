import { useContext, Dispatch, SetStateAction } from "react";
import { Web3Context } from "../Web3Context";
import { Web3Provider } from "@ethersproject/providers";
import { MockHBT } from "lib/typechain-types/index";
import { Signer } from "ethers";
import { displayToast } from "src/utils/toast";
import { getHBTContract } from "src/utils/hbtContract";
import { formatToDisplayEthAddress } from "src/utils";

declare let window: any;

export interface Web3 {
  contract: MockHBT;
  provider: Web3Provider;
  account: string;
  signer: Signer;
  setWeb3?: Dispatch<SetStateAction<Web3>>;
}

export const MetaMask = () => {
  const { account, setWeb3, contract } = useContext(Web3Context);

  async function enableEth() {
    const ethereum = window.ethereum;
    try {
      if (ethereum) {
        const provider = new Web3Provider(ethereum);
        const [address] = await ethereum.request({
          method: "eth_requestAccounts",
        });
        let chainId = await ethereum.request({ method: "eth_chainId" });
        chainId = Number(chainId);
        const signer = provider.getSigner(address);
        const account = signer._address;

        const contract = await getHBTContract({
          chainId,
          signer,
        });

        if (!contract) return;

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
            signer,
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
        <button className="metamask-btn--not-connected" onClick={enableEth}>
          Connect Wallet
        </button>
      ) : (
        <button
          className="metamask-btn--connected"
          onClick={() => displayToast(`Your wallet address is: ${account}`)}
        >
          {formatToDisplayEthAddress(account)}
        </button>
      )}
    </div>
  );
};
