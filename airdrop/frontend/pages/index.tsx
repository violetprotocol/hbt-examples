import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from "next/router";
import { hasClaimingPeriodStarted } from "src/utils";

const Home: NextPage = () => {
  const router = useRouter();

  const onRegisterClick = () => {
    router.push("/eligible");
  };

  const onClaimClick = () => {
    router.push("/claim");
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {hasClaimingPeriodStarted() ? (
        <div className="text-center">
          <h1 className="text-center text-2xl mb-12">The airdrop is live!</h1>
          <button onClick={onClaimClick} className="green-btn">
            Claim
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-center text-2xl mb-12">
            Ready to participate in this airdrop, anon?
          </h1>
          <h2 className="text-lg mb-16">
            Check how many tokens your address is eligible for and register for
            the upcoming airdrop.
          </h2>
          <button onClick={onRegisterClick} className="green-btn">
            Register
          </button>
        </div>
      )}
    </>
  );
};

export default Home;
