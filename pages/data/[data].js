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

  useEffect(() => {
    if (!data) {
      return;
      Router.replace("/login");
    } else {
      dispatch({
        type: "ADD_USER",
        payload: {
          username: data.username,
          loginId: data.loginId,
        },
      });
    }
  }, [data]);

  return (
    <div>
      <Head>
        <title>Data</title>
      </Head>
      <Data sales={sales} />
    </div>
  );
};

export async function getStaticPaths() {
  const usersRoutes = await Axios.get(
    `http://localhost:${process.env.PORT || 3000}/api/auth/register`
  );
  console.log(usersRoutes.data);
  const routes = usersRoutes.data.usernames.map((username) => {
    return { params: { data: username } };
  });
  console.log(routes);
  return {
    paths: routes,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const userItemFetched = await Axios.post(
    `http://localhost:${process.env.PORT || 3000}/api/fetchUserItems`,
    { username: params.data }
  );
  const sales = userItemFetched.data;
  return {
    props: {
      sales,
    },
  };
}

export default data;
