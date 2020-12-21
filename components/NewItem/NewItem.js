import React, { useEffect, useState } from "react";
import styles from "./NewItem.module.scss";
import Axios from "axios";

const NewItem = () => {
  // setting new state
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  // sending the request to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!item || !price) {
      return;
    }
    setLoading(true);
    const addingObject = { item, price };
    await Axios.post("/api/addItem", addingObject)
      .then((res) => {
        setItem("");
        setPrice("");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading((oldval) => !oldval);
  };

  useEffect(() => {
    if (!item || !price) {
      setErr("*****Please Fill All The Fields*****");
    } else {
      setErr("");
    }

    if (loading == true) {
      const submitBtn = document.getElementById("submitBtn");
      submitBtn.disabled = true;
      submitBtn.value = "Adding....";
    } else {
      console.log("Loading Done");
      submitBtn.disabled = false;
      submitBtn.value = "Add Item";
    }
  });

  return (
    <div className={styles.newItem}>
      <div className={styles.addItemForm}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            placeholder="Item Name"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <br />
          <input
            placeholder="Item Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          {err ? (
            <p style={{ textAlign: "center", color: "Red" }}>{err}</p>
          ) : null}
          <input id="submitBtn" type="submit" value="Add Item" />
        </form>
      </div>
      <div className={styles.itemImage}>
        <img src="/login-image.svg" />
      </div>
    </div>
  );
};

export default NewItem;
