import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const LineGraph = ({ sales }) => {
  const [dates, setDates] = useState([]);
  const [spd, setSpd] = useState([]);
  var arr = new Array();

  const gettingDistinctDate = async () => {
    const setForDate = new Set();
    sales.sales.map((sale) => setForDate.add(sale.date));
    setDates([...setForDate]);
    dates.sort((a, b) => {
      return a < b ? -1 : a > b ? 1 : 0;
    });
  };

  // counting number of sales at a given date
  const salesPerDay = () => {
    console.log(dates);
    for (let i = 0; i < dates.length; i++) {
      arr.push(sales.sales.filter((sale) => sale.date == dates[i]).length);
    }
    setSpd(arr);
  };

  useEffect(() => {
    if (dates > 0) {
      console.log("return");
      return;
    } else {
      gettingDistinctDate();
    }
  }, [sales]);
  useEffect(() => {
    salesPerDay();
  }, [dates]);

  return (
    <div>
      <Line
        type="line"
        data={{
          labels: dates,
          datasets: [
            {
              label: "Sales / Day",
              data: spd,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.8)",
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

export default LineGraph;