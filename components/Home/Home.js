import React from "react";
import styles from "./Home.module.scss";

const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.homeText}>
        <h1>The only thing we’re serious about is food.</h1>
      </div>
      <div className={styles.homeImage}>
        <img src="/home-image.svg" />
      </div>
    </div>
  );
};

export default Home;
