import React from "react";
import { NavLink } from "react-router-dom";
import "./Item.scss";
function Item({ to, icon, title }) {
  return (
    <div>
      <NavLink
        to={to}
        className={(navData) => (navData.isActive ? "active" : "")}
      >
        <div className="item-link">
          {icon}
          <span>{title}</span>
        </div>
      </NavLink>
    </div>
  );
}

export default Item;
