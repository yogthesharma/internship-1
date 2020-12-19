import Axios from "axios";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useUser } from "../../hooks/userHook";
import styles from "./Login.module.scss";

const Login = () => {
  // get dispatch init
  const dispatch = useDispatch();

  // user
  const [data, { mutate }] = useUser();

  // init states login
  const [loginIdLogin, setLoginIdLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [errStmtLogin, setErrStmtLogin] = useState("");

  // init states for register
  const [username, setUsername] = useState("");
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errStmtRegister, setErrStmtRegister] = useState("");

  //   handling submits
  // login
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    if (!loginIdLogin || !passwordLogin) {
      return setErrStmtLogin("Please Fill All The Fields....");
    }
    await Axios.post("/api/auth/login", { loginIdLogin, passwordLogin })
      .then(async (res) => {
        if (!res.data.errFlag) {
          dispatch({
            type: "ADD_USER",
            payload: { username: res.data.username, loginId: res.data.loginId },
          });
          Router.replace("/order");
          return;
        } else {
          console.log(res.data.errFlag);
        }
      })
      .catch((err) => console.log(err));
  };

  // register
  const handleSubmitRegister = async (e) => {
    e.preventDefault();

    if (!loginId || !password || !username || !confirmPassword) {
      setErrStmtRegister("Please Fill All The Fields....");
      return;
    }
    if (confirmPassword !== password) {
      console.log("Done");
      setErrStmtRegister("Passwords Do Not Match.....");
      return;
    }

    await Axios.post("/api/auth/register", {
      username,
      loginId,
      password,
    })
      .then(async (res) => {
        if (!res.data.errFlag) {
          console.log(res.data);
          dispatch({
            type: "ADD_USER",
            payload: { username: res.data.username, loginId: res.data.loginId },
          });
          Router.replace("/order");
          return;
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginForm}>
        <form onSubmit={(e) => handleSubmitLogin(e)}>
          <input
            type="text"
            value={loginIdLogin}
            placeholder="Login ID"
            onChange={(e) => setLoginIdLogin(e.target.value)}
          />
          <input
            type="password"
            value={passwordLogin}
            placeholder="Password"
            onChange={(e) => setPasswordLogin(e.target.value)}
          />
          {errStmtLogin ? (
            <p style={{ color: "red", textAlign: "center" }}>{errStmtLogin}</p>
          ) : null}
          <input type="submit" value="Login" />
        </form>
      </div>
      <div className={styles.signupForm}>
        <form onSubmit={(e) => handleSubmitRegister(e)}>
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            value={loginId}
            placeholder="Login ID"
            onChange={(e) => setLoginId(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errStmtRegister ? (
            <p style={{ color: "red", textAlign: "center" }}>
              {errStmtRegister}
            </p>
          ) : null}
          <input type="submit" value="Register" />
        </form>
      </div>
    </div>
  );
};

export default Login;
