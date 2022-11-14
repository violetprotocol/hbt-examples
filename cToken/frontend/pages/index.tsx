import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Web3Context } from "src/context/Web3Context";
import { useHasHBT } from "src/hooks/useHBT";
import { generateRandomTokenId } from "src/utils";
import { Mining } from "src/helpers/Mining";
import Link from "next/link";

const Home: NextPage = () => {
  const router = useRouter();
  const { account, hbtContract } = useContext(Web3Context);
  const [{ isMining, txHash }, setIsMining] = useState({
    isMining: false,
    txHash: "",
  });
  const hbtMinted = useHasHBT(account);

  const onClaimClick = async () => {
    const res = await hbtContract.safeMint(account, generateRandomTokenId());
    setIsMining({ isMining: true, txHash: res.hash });
    try {
      await res.wait();
    } catch (error) {
      console.error(error);
    } finally {
      setIsMining({ isMining: false, txHash: "" });
    }
  };

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
          Step 1: Claim your HBT {hbtMinted && "✅"}
        </h1>
        {hbtMinted ? (
          <button disabled className="disabled-btn">
            Claimed!
          </button>
        ) : (
          <>
            <h2 className="text-lg mb-16">
              With a HBT you are able to mint some compliant ERC20 and wrap
              non-compliant ERC20 tokens and make them compliant!
            </h2>
            <button onClick={onClaimClick} className="green-btn">
              Claim
            </button>
            <Mining isMining={isMining} txHash={txHash} />
          </>
        )}

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
          Step 3: Trade your cERC20 token
        </h1>
        <h2 className="text-md mb-16">
          cERC20 tokens can only be traded to and from accounts with Humanbound
          tokens
        </h2>
        <h2 className="link text-center text-xl mb-12">
          <Link href="/swap">Send some tokens →</Link>
        </h2>
      </div>
    </>
  );
};

export default Home;
