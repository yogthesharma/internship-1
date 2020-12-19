import React from "react";
import styles from "./Nav.module.scss";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { useUser } from "../../hooks/userHook";

const Nav = () => {
  // getting the user from the global state
  const user = useSelector((state) => state.user);

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
    </nav>
  );
};

export default Nav;
