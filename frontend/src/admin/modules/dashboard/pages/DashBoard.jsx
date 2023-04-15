import React from "react";
import Widget from "../component/widget/Widget";
import "./DashBoard.scss";
function DashBoard() {
  return (
    <div className="dashBoardContainer">
      <div className="title">DashBoard</div>
      <div className="widgetAdmin">
        <Widget type="user" />
        <Widget type="order" />
        <Widget type="earning" />
        <Widget type="balance" />
      </div>
    </div>
  );
}

export default DashBoard;
