import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import DateRangeIcon from "@mui/icons-material/DateRange";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";

import { FormatNumber } from "~/customer/modules/Home/component/products/component/Price/Price";

import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  getAOrder,
  resetAlert,
  updateStatusOrder,
} from "~/redux/slice/order/OrderSlice";
import ProductItem from "../component/ProductItem/ProductItem";
import "./Order.scss";
import CancelOrderModal from "../component/CancelOrderModal/CancelOrderModal";

const Order = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderSingle, Alert } = useSelector((state) => state.order);
  useEffect(() => {
    if (Alert === "Orders are shipping!") {
      toast.success("Bạn đã cập nhật thành công", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setTimeout(
        () => dispatch(resetAlert()),
        navigate("/shipper/deliveryOrders"),
        3000
      );
    } else if (Alert === "Order has been delivered successfully!") {
      toast.success("Bạn đã cập nhật thành công", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setTimeout(
        () => dispatch(resetAlert()),
        navigate("/shipper/dashboard"),
        3000
      );
    }
  }, [dispatch, Alert, navigate]);
  useEffect(() => {
    dispatch(getAOrder(id));
  }, [dispatch, id]);

  const handelOrder = (e) => {
    e.preventDefault();
    const selectedOptionValue = JSON.parse(e.target.value);
    if (selectedOptionValue.name === "Trả hàng") {
      setIsModalOpen(true);
    } else {
      Swal.fire({
        title: `Bạn có chắc muốn ${selectedOptionValue.name} `,
        showCancelButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
        customClass: {
          actions: "my-actions",
          cancelButton: "order-1 right-gap",
          confirmButton: "order-2",
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          dispatch(
            updateStatusOrder({ id, order_status_id: selectedOptionValue.id })
          );
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
  };
  return (
    <div className="SingleOrderContainer">
      <ToastContainer />
      {isModalOpen ? (
        <CancelOrderModal setIsModalOpen={setIsModalOpen} id={id} />
      ) : (
        ""
      )}
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
              <option>{orderSingle.order_status_name}</option>
              {orderSingle.order_status_id === 2 ? (
                <option value='{"id":3, "name":"Xác nhận đơn hàng"}'>
                  Xác nhận đơn hàng
                </option>
              ) : (
                <>
                  <option value='{"id":4, "name":"Đã giao"}'>Đã giao</option>
                  <option value='{"id":6, "name":"Trả hàng"}'>Trả hàng</option>
                </>
              )}
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
                <div className="info__item--paid">Trực tiếp</div>
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

export default Order;
