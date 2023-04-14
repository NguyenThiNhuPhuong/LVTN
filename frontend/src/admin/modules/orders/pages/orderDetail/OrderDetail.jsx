import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import DateRangeIcon from "@mui/icons-material/DateRange";
import PersonIcon from "@mui/icons-material/Person";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import ProductItem from "../../component/ProductItem/ProductItem";
import { FormatNumber } from "~/customer/modules/Home/component/products/component/Price/Price";

import "./OrderDetail.scss";
function OrderDetail() {
  const cart = useSelector((state) => state.cart.listCart);

  const [total, setTotal] = useState(0);
  /// total bill
  useEffect(() => {
    const res = cart.reduce((total, item) => {
      return (
        total +
        (item.price_sale > 0
          ? item.price_sale * item.cartNum
          : item.price * item.cartNum)
      );
    }, 0);
    setTotal(res);
  }, [cart]);
  return (
    <div className="OrderDetailContainer">
      <div className="top">
        <NavLink to="/admin/order">Back to Orders</NavLink>
      </div>
      <div className="OrderDetail">
        <div className="header">
          <div className="header__time">
            <div className="header__time--date">
              <DateRangeIcon />
              <span>Thus,Jan 11,2022 7:52 PM</span>
            </div>
            <div className="header__time--Id">Order ID:111111111</div>
          </div>
          <div className="header__status">
            <select>
              <option value="Change Status">Change Status</option>
            </select>
          </div>
        </div>
        <div className="content">
          <div className="info">
            <div className="info__item">
              <div className="info__item--icon">
                <PersonIcon />
              </div>
              <div className="info__item--user">
                <div className="info__item--label">Customer</div>
                <div className="info__item--name">Admin</div>
                <div className="info__item--email">Admin@gmail.com</div>
              </div>
            </div>
            <div className="info__item">
              <div className="info__item--icon">
                <LocalShippingIcon />
              </div>
              <div className="info__item--address">
                <div className="info__item--label">Order info</div>
                <div className="info__item--name">Nabeo</div>
                <div className="info__item--paid">Paypal</div>
              </div>
            </div>

            <div className="info__item">
              <div className="info__item--icon">
                <LocationOnIcon />
              </div>
              <div className="info__item--deliver">
                <div className="info__item--label">Deliver to</div>
                <div className="info__item--address">Thon thong nhat</div>
                <div className="info__item--pox">009090909</div>
              </div>
            </div>
          </div>
          <div className="order">
            <div className="order__product">
              <div className="product__row product__header-labels">
                <div className="text-center noBorder">Product</div>
                <div className="text-center"></div>
                <div className="text-center">Giá</div>
                <div className="text-center">Số lượng</div>
                <div className="text-center">Tổng tiền</div>
              </div>
              <ProductItem />
            </div>
            <div className="order__footer">
              <div className="order__footer--total">
                <p className="order__footer--total--title">
                  <span>Phí vận chuyển:</span>
                  <span>
                    <FormatNumber price={total} />
                  </span>
                </p>
                <p className="order__footer--total--title">
                  <span>Tổng tiền:</span>
                  <span className="h3">
                    <FormatNumber price={total} />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
