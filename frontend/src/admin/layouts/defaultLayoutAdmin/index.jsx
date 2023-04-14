import React from "react";
import Navbar from "../component/navbar/Navbar";
import Sidebar from "../component/sidebar/Sidebar";
import "./DefaultLayoutAdmin.scss";
function DefaultLayoutAdmin({ children }) {
  return (
    <div className="AdminContainer">
      <Sidebar />
      <div className="main">
        <Navbar />
        <div>{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayoutAdmin;
