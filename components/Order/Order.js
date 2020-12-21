import Router from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import styles from "./Order.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUser } from "../../hooks/userHook";
import Axios from "axios";

const Order = ({ items }) => {
  // getting value from global state
  const user = useSelector((user) => user.user);

  // loading options
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // for options data
  const [optionsAll, setOptionsAll] = useState();
  const [options, setOptions] = useState([]);

  // state hooks
  const [item, setItem] = useState("Hello");
  const [qty, setQty] = useState("");
  const [startDate, setStartDate] = useState();
  const [price, setPrice] = useState(Number);

  // adding the options and optionsAll for items
  const mainOptions = async () => {
    setOptionsAll(items.items);
    await items.items.map((item) => {
      setOptions((option) => [
        ...option,
        { value: item.item, label: item.item },
      ]);
    });
  };

  // and returning the price of selected item
  const selectedItemPrice = () => {
    if (!optionsAll || item === "Hello" || !qty) {
      return;
    }
    const returnedObject = optionsAll.find(
      (option) => option.item == item.value
    );
    console.log(item, optionsAll, returnedObject);
    const calcPrice = qty * returnedObject.price;
    setPrice(calcPrice);
    return calcPrice;
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      height: "20px",
      backgroundColor: " #f64c713b",
      outline: "none",
      borderBottom: "1px solid #2f2fa2",
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      height: "100%",
      display: "flex",
      alignItems: "center",
    }),

    placeholder: (provided, state) => ({
      ...provided,
      marginTop: "0px",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      marginTop: "20px",
    }),

    indicatorsContainer: (provided, state) => ({
      ...provided,
      backgroundColor: "#2f2fa2",
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: "none",
    }),
  };

  // handling submit for the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!startDate || !item || !qty) {
      return;
    }
    setLoading(true);

    const dateConvert = new Date(startDate);
    const date = dateConvert.toISOString();
    const sales = { date, item, qty, price, loginId: user.loginId };

    await Axios.patch("/api/auth/register", sales)
      .then((res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        return setStatus("Some Error Occured In Placing Order");
      });
  };

  // component did mount
  useEffect(() => {
    mainOptions();
  }, []);

  useEffect(() => {
    selectedItemPrice();
  }, [qty, item]);

  useEffect(() => {
    if (!startDate || !item || !qty) {
      setError("Please Enter All The Fields");
    } else {
      setError("");
    }
    const submitBtn = document.getElementById("submitBtn");

    if (loading == true) {
      submitBtn.value = "Loading...";
      submitBtn.disabled = true;
    } else {
      submitBtn.disabled = false;
      submitBtn.value = "Place Order";
    }
  });

  return (
    <div className={styles.order}>
      <div className={styles.orderForm}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <DatePicker
            title="MM/DD/YYYY"
            withPortal
            selected={startDate}
            dateFormat="dd/MM/yyyy"
            onChange={(date) => setStartDate(date)}
            placeholder="Select Date"
            closeOnScroll={true}
            placeholderText="Select Date"
          />
          <Select
            makeAnimated
            styles={customStyles}
            options={options}
            defaultValue={item}
            onChange={setItem}
          />
          <input
            placeholder="Quantity"
            type="number"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />
          <div className={styles.calc}>
            {price && !error ? `Total Price Of Order: ₹${price}` : null}
          </div>
          {error ? (
            <p style={{ textAlign: "center", color: "red" }}>
              <i>*****{error}*****</i>
            </p>
          ) : null}
          <input type="submit" id="submitBtn" />
        </form>
      </div>
      <div className={styles.orderImage}>
        <img src="/order-image.svg" />
      </div>
    </div>
  );
};

export default Order;
