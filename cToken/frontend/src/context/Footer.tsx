import Link from "next/link";
import {
  cERC20Contracts,
  humanboundContracts,
  MockERC20Contracts,
  Web3ChainReference,
} from "src/shared";
import { useNetwork } from "wagmi";

const Footer: React.FC = () => {
  const { chain } = useNetwork();

  return (
    <div className="my-3 text-center text-sm">
      {chain && (
        <ul>
          <li>
            <div>
              cERC20 address:{" "}
              {cERC20Contracts[chain.id as Web3ChainReference].address}
            </div>
          </li>
          <li>
            <div>
              HBT address:{" "}
              {humanboundContracts[chain.id as Web3ChainReference].address}
            </div>
          </li>
          <li>
            <div>
              cERC20 address:{" "}
              {MockERC20Contracts[chain.id as Web3ChainReference].address}
            </div>
          </li>
        </ul>
      )}
      Disclaimer: No warranty is made of any kind. See more{" "}
      <Link href="https://github.com/violetprotocol/hbt-examples/blob/main/cToken/LICENSE">
        here
      </Link>
      .
    </div>
  );
};

export default Footer;
