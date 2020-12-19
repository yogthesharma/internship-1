import Head from "next/head";
import HomeComp from "../components/Home/Home";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Chef's Hub</title>
      </Head>
      <HomeComp />
    </div>
  );
}
