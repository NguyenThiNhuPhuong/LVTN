import React from "react";
import "./Top.scss";
import { NavLink } from "react-router-dom";
function Top({ title, to }) {
  return (
    <div className="top">
      <div className="title">{title}</div>
      <div className="btn">
        <NavLink to={to}>Create new</NavLink>
      </div>
    </div>
  );
}

export default Top;
