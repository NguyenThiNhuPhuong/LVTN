import React from "react";
import Header from "../component/Header/Header";
import Sidebar from "../component/Sidebar/Sidebar";
import "./defaultLayoutShipper.scss";
function defaultLayoutShipper({ children }) {
  return (
    <div className="defaultLayoutShipper">
      <Header />
      <div className="content">
        <Sidebar />
        <div className="content__children">{children}</div>
      </div>
    </div>
  );
}

export default defaultLayoutShipper;
