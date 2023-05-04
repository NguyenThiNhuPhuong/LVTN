import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

import DateRangeIcon from "@mui/icons-material/DateRange";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";

import { FormatNumber } from "~/customer/modules/Home/component/products/component/Price/Price";
import ProductItem from "../../component/ProductItem/ProductItem";

import Swal from "sweetalert2";
import { getAOrder, updateStatusOrder } from "~/redux/slice/order/OrderSlice";
import "./SingleOrder.scss";

const SingleOrder = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { orderSingle } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAOrder(id));
  }, [dispatch, id]);

  const handelOrder = (e) => {
    e.preventDefault();
    Swal.fire({
      title: `Bạn có chắc muốn ${e.target.value.name} `,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
      customClass: {
        actions: "my-actions",
        cancelButton: "order-1 right-gap",
        confirmButton: "order-2",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(e.target.value.id);
        dispatch(updateStatusOrder(id, e.target.value.id));
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  return (
    <div className="SingleOrderContainer">
      <div className="top">
        <NavLink to="/admin/order">Back to Orders</NavLink>
      </div>
      <div className="SingleOrder">
        <div className="header">
          <div className="header__time">
            <div className="header__time--date">
              <DateRangeIcon />
              <span>{orderSingle.date}</span>
            </div>
            <div className="header__time--Id">Order ID:{orderSingle.code}</div>
          </div>
          <div className="header__status">
            <select onChange={(e) => handelOrder(e)}>
              <option>Chờ lấy hàng</option>
              <option value={{ id: 1, name: "hủy đơn hàng" }}>
                Hủy đơn hàng
              </option>
              <option value={{ id: 2, name: "Xác nhân đơn hàng" }}>
                Xác nhận đơn hàng
              </option>
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
                <div className="info__item--name">{orderSingle.name}</div>
                <div className="info__item--email">{orderSingle.email}</div>
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
                <div className="info__item--address">{orderSingle.address}</div>
                <div className="info__item--pox">{orderSingle.phone}</div>
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
                    <FormatNumber price={orderSingle.price_ship} />
                  </span>
                </p>
                <p className="order__footer--total--title">
                  <span>Tổng tiền:</span>
                  <span className="h3">
                    <FormatNumber price={orderSingle.price_all} />
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
