import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.scss";
function Header() {
  return (
    <div className="header">
      <a href="/" className="header__logo">
        <h1 className="logo-text">Girl Bag</h1>
      </a>

      <ul className="header__breadcrumb">
        <li className="header__breadcrumb--item header__breadcrumb--item-current">
          <NavLink to="/cart">Giỏ hàng</NavLink>
        </li>
        <li className="header__breadcrumb--item header__breadcrumb--item-current">
          Thông tin giao hàng
        </li>
      </ul>
    </div>
  );
}

export default Header;
