import React, { useState } from "react";
import LineGraph from "./LineGraph";
import PieGraph from "./PieGraph";
import styles from "./Data.module.scss";
import BarGraph from "./BarGraph";

const Data = ({ sales }) => {
  const [graphType, setGraphType] = useState("");

  return (
    <div style={{ position: "relative", height: "90.7vh" }}>
      {graphType === "pie" ? (
        <PieGraph sales={sales} />
      ) : graphType === "bar" ? (
        <BarGraph sales={sales} />
      ) : (
        <LineGraph sales={sales} />
      )}

      <div className={styles.btnDiv}>
        <button onClick={() => setGraphType("line")}>Sales/Day</button>
        <button onClick={() => setGraphType("pie")}>Product/Qty</button>
        <button onClick={() => setGraphType("bar")}>Sales/Product</button>
      </div>
    </div>
  );
};

export default Data;
