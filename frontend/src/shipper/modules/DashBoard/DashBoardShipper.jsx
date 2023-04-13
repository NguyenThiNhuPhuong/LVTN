import React from "react";
import Widget from "../component/widget/Widget";
import "./DashBoardShipper.scss";
function DashBoardShipper() {
  return (
    <div className="dashBoardContainer">
      <div className="title">DashBoard</div>
      <div className="widgets">
        <Widget type="user" />
        <Widget type="order" />
        <Widget type="earning" />
      </div>
    </div>
  );
}

export default DashBoardShipper;
