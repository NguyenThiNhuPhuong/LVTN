import { useEffect } from "react";
import Widget from "../component/widget/Widget";

import { useDispatch } from "react-redux";
import {
  getTotalItem,
  getTotalOrderStatus,
  getTotalRevenue,
} from "~/redux/slice/dashboard/DashboardSlice";
import "./DashBoard.scss";
import RevenueChart from "../component/RevenueChart/RevenueChart";
import OrderStatusChart from "../component/OrderStatusChart/OrderStatusChart";
const DashBoard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotalItem());
    dispatch(getTotalRevenue(2023));
    dispatch(getTotalOrderStatus());
  }, [dispatch]);

  return (
    <div className="dashBoardContainer">
      <div className="title">DashBoard</div>
      <div className="widgetAdmin">
        <Widget type="user" />
        <Widget type="order" />
        <Widget type="discount" />
        <Widget type="category" />
      </div>
      <div className="Chart">
        <div>
          <OrderStatusChart />
        </div>
        <div>
          <RevenueChart />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
