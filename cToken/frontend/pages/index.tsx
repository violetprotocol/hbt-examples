import type { NextPage } from "next";
import Head from "next/head";
import { useAccount } from "wagmi";
import { useHasHBT } from "src/hooks/useHasHBT";
import Link from "next/link";
import ClaimHBTButton from "src/components/ClaimHBTButton";

const Home: NextPage = () => {
  const { address } = useAccount();
  const hasHBT = useHasHBT(address);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="text-center">
        <h1 className="text-center text-2xl mb-12">
          cERC20: Compliant ERC20 tokens!
        </h1>
        <h2 className="text-md mb-16">
          Compliant ERC20 tokens are ERC20 tokens that can only be used by
          accounts that have been verified and issued a Humanbound Token.
        </h2>

        <h1 className="text-center text-2xl mb-12">
          Step 1: Claim your HBT {hasHBT && "✅"}
        </h1>
        {hasHBT && (
          <h2 className="text-lg mb-16">
            With a HBT you are able to mint some compliant ERC20 and wrap
            non-compliant ERC20 tokens and make them compliant!
          </h2>
        )}
        <ClaimHBTButton disabled={hasHBT || false} />

        <h1 className="text-center text-2xl mb-12">
          Step 2: Obtain some Compliant ERC20!
        </h1>
        <h2 className="text-md mb-16">
          Compliant ERC20 tokens can only be obtained by accounts that have been
          verified and issued a Humanbound Token.
        </h2>
        <ul>
          <li>
            <h2 className="link text-center text-xl mb-12">
              <Link href="/mint">Directly mint a Compliant cERC20 →</Link>
            </h2>
          </li>
          <li>
            <h2 className="link text-center text-xl mb-12">
              <Link href="/wrap">
                Convert a non-compliant ERC20 to cERC20 →
              </Link>
            </h2>
          </li>
        </ul>

        <h1 className="text-center text-2xl mb-12">
          Step 3: Send your cERC20 token
        </h1>
        <h2 className="text-md mb-16">
          cERC20 tokens can only be sent to and from accounts with Humanbound
          tokens
        </h2>
        <h2 className="link text-center text-xl mb-12">
          <Link href="/send">Send some tokens →</Link>
        </h2>
      </div>
    </>
  );
};

export default Home;
