import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import NewItem from "../components/NewItem/NewItem";
import { useUser } from "../hooks/userHook";
import Router from "next/router";

const newitem = () => {
  // dispatcher from react-redux
  const dispatch = useDispatch();
  const [data, { mutate }] = useUser();

  useEffect(() => {
    if (!data) {
      return Router.replace("/login");
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
        <title>Add New Item</title>
      </Head>
      <NewItem />
    </div>
  );
};

export default newitem;
