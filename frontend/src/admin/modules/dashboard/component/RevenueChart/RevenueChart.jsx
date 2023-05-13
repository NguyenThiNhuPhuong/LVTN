import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
const RevenueChart = () => {
  const { totalRevenue } = useSelector((state) => state.dashboard);
  // Đăng ký scale 'linear'
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const data = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    datasets: [
      {
        label: "Doanh thu",
        data: totalRevenue,
        backgroundColor: "rgb(75, 192, 192)",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    indexAxis: "x",
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
        text: "Doanh thu của năm 2023",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default RevenueChart;
