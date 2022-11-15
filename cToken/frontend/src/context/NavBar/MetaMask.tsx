import { useContext, Dispatch, SetStateAction } from "react";
import { Web3Context } from "../Web3Context";
import { Web3Provider } from "@ethersproject/providers";
import { CERC20, MockERC20, MockHBT } from "lib/types/index";
import { Signer } from "ethers";
import { displayToast } from "src/utils/toast";
import {
  getCERC20Contract,
  getERC20Contract,
  getHBTContract,
} from "src/utils/hbtContract";
import { formatToDisplayEthAddress } from "src/utils";

declare let window: any;

export interface Web3 {
  hbtContract: MockHBT;
  erc20Contract: MockERC20;
  cerc20Contract: CERC20;
  provider: Web3Provider;
  account: string;
  signer: Signer;
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
        let chainId = await ethereum.request({ method: "eth_chainId" });
        chainId = Number(chainId);
        const signer = provider.getSigner(address);
        const account = signer._address;

        const hbtContract = await getHBTContract({
          chainId,
          signer,
        });

        const erc20Contract = await getERC20Contract({ signer, chainId });
        const cerc20Contract = await getCERC20Contract({ signer, chainId });

        if (!hbtContract || !erc20Contract || !cerc20Contract) return;

        console.log(
          `On chain ${chainId} \n \
		   Contracts connected:\n \
		   HBT: ${hbtContract.address}\n \
		   ERC20: ${erc20Contract.address}\n \
		   cERC20: ${cerc20Contract.address}\n \
		   with signer ${await hbtContract.signer.getAddress()}`
        );

        setWeb3 &&
          setWeb3((prev: Web3) => ({
            ...prev,
            hbtContract,
            erc20Contract,
            cerc20Contract,
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
