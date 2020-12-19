import Head from "next/head";
import React, { useEffect } from "react";
import Login from "../components/Login/Login";
import { useDispatch } from "react-redux";
import { useUser } from "../hooks/userHook.jsx";
import Router from "next/router";

const login = () => {
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
        <title>Login/Register</title>
      </Head>
      <Login />
    </div>
  );
};

export default login;
