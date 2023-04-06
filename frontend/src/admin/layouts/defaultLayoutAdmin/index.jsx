import React from "react";
import Navbar from "../component/navbar/Navbar";
import Sidebar from "../component/sidebar/Sidebar";
import "./DefaultLayoutAdmin.scss";
function DefaultLayoutAdmin({ Children }) {
  return (
    <div className="AdminContainer">
      <Sidebar />
      <div className="main">
        <Navbar />
        {Children}
      </div>
    </div>
  );
}

export default DefaultLayoutAdmin;
