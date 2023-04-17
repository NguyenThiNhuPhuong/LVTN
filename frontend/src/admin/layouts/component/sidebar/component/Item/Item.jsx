import React from "react";
import { NavLink } from "react-router-dom";
import "./Item.scss";
import { useDispatch } from "react-redux";
import { logoutUser } from "~/redux/slice/auth/AuthSlice";
function Item({ to, icon, title, onclick }) {
  const dispatch = useDispatch();
  return (
    <div className="ItemContainer">
      <button
        onClick={() => (onclick === "true" ? dispatch(logoutUser()) : "")}
      >
        <NavLink
          to={to}
          className={(navData) => (navData.isActive ? "active" : "")}
        >
          <div className="ItemContainer__link">
            {icon}
            <span>{title}</span>
          </div>
        </NavLink>
      </button>
    </div>
  );
}

export default Item;
