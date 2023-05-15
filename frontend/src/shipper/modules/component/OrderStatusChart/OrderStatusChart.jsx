import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);
const OrderStatusChart = () => {
  const { totalOrderStatus } = useSelector((state) => state.dashboard);
  const data = {
    labels: ["chờ lấy hàng", "Đã giao", "Đang giao", "Trả hàng"],
    datasets: [
      {
        label: "# of Votes",
        data: totalOrderStatus,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Tổng hợp số lượng Status Order",
        position: "bottom",
      },
    },
  };
  return <Pie data={data} options={options} />;
};
export default OrderStatusChart;
