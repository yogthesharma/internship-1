import Axios from "axios";
import Head from "next/head";
import Router from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Order from "../components/Order/Order";
import { useUser } from "../hooks/userHook";

const order = ({ items }) => {
  // dispatcher from react-redux
  const dispatch = useDispatch();
  const [data, { mutate }] = useUser();

  useEffect(() => {
    if (!data) {
      // return Router.replace("/login");
      return;
    } else {
      console.log(data.loginId, data.username);
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
        <title>Order</title>
      </Head>
      <Order items={items} />
    </div>
  );
};

export async function getServerSideProps() {
  const fetchedItems = await Axios.get(`http://localhost:${process.env.PORT||3000}/api/addItem`);

  return {
    props: {
      items: fetchedItems.data,
    },
  };
}

export default order;
