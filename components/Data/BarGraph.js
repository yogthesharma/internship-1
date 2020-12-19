import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

const BarGraph = ({ sales }) => {
  const [qty, setQty] = useState([]);
  const [item, setItem] = useState([]);

  // functions
  const distinctProduct = () => {
    const itemSet = new Set();
    sales.sales.map((sale) => itemSet.add(sale.item.value));
    setItem([...itemSet]);
  };

  // total sales done productwise
  const productSoldByQuantity = () => {
    const arr = new Array();
    for (let i = 0; i < item.length; i++) {
      arr.push(sales.sales.filter((sale) => sale.item.value == item[i]).length);
    }
    console.log(arr);
    setQty(arr);
  };

  useEffect(() => {
    distinctProduct();
  }, [sales]);
  useEffect(() => {
    productSoldByQuantity();
  }, [item]);
  return (
    <div>
      <Bar
        type="line"
        data={{
          labels: item,
          datasets: [
            {
              label: "Sales/Day",
              data: qty,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        }}
        width={100}
        height={500}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default BarGraph;
