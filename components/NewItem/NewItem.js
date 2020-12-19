import React, { useState } from "react";
import styles from "./NewItem.module.scss";
import Axios from "axios";

const NewItem = () => {
  // setting new state
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");

  // sending the request to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const addingObject = { item, price };
    console.log(addingObject);
    await Axios.post("/api/addItem", addingObject)
      .then((res) => {
        setItem("");
        setPrice("");
        console.log(res.data);
        return;
      })
      .catch((err) => console.log(err));
  };

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
          <input type="submit" value="Add Item" />
        </form>
      </div>
      <div className={styles.itemImage}>
        <img src="/login-image.svg" />
      </div>
    </div>
  );
};

export default NewItem;
