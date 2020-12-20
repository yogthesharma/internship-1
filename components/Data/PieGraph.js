import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

const PieGraph = ({ sales }) => {
  const [qty, setQty] = useState([]);
  const [item, setItem] = useState([]);

  // functions
  const distinctProduct = () => {
    const itemSet = new Set();
    sales.sales.map((sale) => itemSet.add(sale.item.value));
    setItem([...itemSet]);
  };

  // products sold by qty
  const productSoldByQuantity = () => {
    // console.log(sales.sales, item);
    const arr = new Array();
    for (let i = 0; i < item.length; i++) {
      arr.push(
        sales.sales.reduce(function (sum, record) {
          if (record.item.value === item[i]) {
            return sum + record.newQty;
          } else {
            return sum;
          }
        }, 0)
      );
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
      <Pie
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
        width={90}
        height={500}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  );
};

export default PieGraph;
