import React from "react";
import { NavLink } from "react-router-dom";
import "./CartNoProduct.scss";
function CartNoProduct() {
  return (
    <div className="CartContainer">
      <div className="container__wrapper">
        <div className="header">
          <a href="/" className="header__logo">
            <h1 className="header__logo--text">Girl Bag</h1>
          </a>
          <div className="header__breadcrumb">
            <NavLink to="/">Trang chủ /</NavLink>
            <span className="header__breadcrumb--text">Giỏ hàng của bạn</span>
          </div>
        </div>
        <div className="content">
          <div className="content__noProduct">
            <img
              src="https://shop.worlddogfinder.com/images/cartEmpty.png"
              alt="CartNoProduct"
            />
            <div className="content__noProduct--btn">
              <button>
                <NavLink to="/product/shop">Tiếp tục mua hàng</NavLink>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartNoProduct;
