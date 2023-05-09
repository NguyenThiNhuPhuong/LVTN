import { useEffect } from "react";
import Widget from "../component/widget/Widget";

import { useDispatch } from "react-redux";
import { getTotalItem } from "~/redux/slice/dashboard/DashboardSlice";
import "./DashBoard.scss";
const DashBoard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotalItem());
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
    </div>
  );
};

export default DashBoard;
