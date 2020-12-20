import React, { useEffect } from "react";
import styles from "./Nav.module.scss";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { useUser } from "../../hooks/userHook";
import Router from "next/router";

const Nav = () => {
  // getting the user from the global state
  const user = useSelector((state) => state.user);
  const nav = useSelector((state) => state.nav);

  // using custom hook for auth
  const [data, { mutate }] = useUser();

  // init dispatch actions
  const dispatch = useDispatch();

  // logging the user out
  const logout = async () => {
    await Axios.get("/api/auth/logout");
    dispatch({
      type: "REMOVE_USER",
    });
    mutate("");
    Router.push("/login");
  };

  // toggle actions
  const getToggler = () => {
    const toggler = document.getElementById("toggler");
    const removeNav = document.getElementById("removeNav");
    removeNav.style.display = "unset";
    toggler.classList.add(styles.sideToolBarConf);
  };
  const removeNavToggle = () => {
    const toggler = document.getElementById("toggler");
    removeNav.style.display = "none";
    toggler.classList.remove(styles.sideToolBarConf);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <h3>Chef's Hub</h3>
      </div>
      <div className={styles.links}>
        <ul>
          {user.username ? (
            <>
              <li>
                <Link href="/order">Order</Link>
              </li>
              <li>
                <Link href="/new-item">Add Item</Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: "/data/[data]",
                    query: { data: user.username },
                  }}
                >
                  View Report
                </Link>
              </li>
              <li>
                <a onClick={logout}>Logout</a>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/login">Login/Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className={styles.hamburger} onClick={() => getToggler()}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div id="toggler" className={styles.sideToolBar}>
        <ul>
          {user.username ? (
            <>
              <li>
                <Link href="/order">Order</Link>
              </li>
              <li>
                <Link href="/new-item">Add Item</Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: "/data/[data]",
                    query: { data: user.username },
                  }}
                >
                  View Report
                </Link>
              </li>
              <li>
                <a onClick={logout}>Logout</a>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/login">Login/Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div
        id="removeNav"
        onClick={() => removeNavToggle()}
        className={styles.removeNav}
      ></div>
    </nav>
  );
};

export default Nav;
