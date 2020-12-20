import Axios from "axios";
import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Data from "../../components/Data/Data";
import { useUser } from "../../hooks/userHook";
import Router from "next/router";

const data = ({ sales }) => {
  // dispatcher from react-redux
  const dispatch = useDispatch();
  const [data, { mutate }] = useUser();

  // useEffect(() => {
  //   if (!data) {
  //     return;
  //     Router.replace("/login");
  //   } else {
  //     dispatch({
  //       type: "ADD_USER",
  //       payload: {
  //         username: data.username,
  //         loginId: data.loginId,
  //       },
  //     });
  //   }
  // }, [data]);

  return (
    <div>
      <Head>
        <title>Data</title>
      </Head>
      <Data sales={sales} />
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const dev = process.env.NODE_ENV === "development";
  const server = dev
    ? "http://localhost:3000"
    : "https://internship-1-mi9sz8kcv.vercel.app";
  const userItemFetched = await Axios.post(server + "/api/fetchUserItems", {
    username: params.data,
  });
  const sales = userItemFetched.data;
  return {
    props: {
      sales,
    },
  };
}

export default data;
