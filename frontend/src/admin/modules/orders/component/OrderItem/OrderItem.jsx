import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./OrderItem.scss";
import { NavLink } from "react-router-dom";
function OrderItem() {
  const [data, setData] = useState([]);

  return (
    <div className="order__row">
      <div className="order__row--name text">2</div>
      <div className="order__row--email text">3</div>
      <div className="order__row--total text">4</div>
      <div className="order__row--paid text">5</div>
      <div className="order__row--date text">6</div>
      <div className="order__row--status text">
        <div className="order__row--status--btn">nananan</div>
      </div>
      <div className="order__row--action text">
        <NavLink to="/admin/order/detailOrder">
          <VisibilityIcon />
        </NavLink>
      </div>
    </div>
  );
}

export default OrderItem;
