import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();

  const onRegisterClick = () => {
    router.push("/eligible");
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="text-center">
        <h1 className="text-center text-2xl mb-4">
          Ready to participate in this airdrop, anon?
        </h1>
        <h2 className="text-lg mb-4">
          Check how many tokens your address is eligible for and register for
          the upcoming airdrop.
        </h2>
        <button onClick={onRegisterClick} className="yellow-btn">
          Register
        </button>
      </div>
    </>
  );
};

export default Home;
