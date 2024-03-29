import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

import WarningIcon from "@mui/icons-material/Warning";
import DateRangeIcon from "@mui/icons-material/DateRange";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";

import { FormatNumber } from "~/customer/modules/Home/component/products/component/Price/Price";
import ProductItem from "../../component/ProductItem/ProductItem";

import Swal from "sweetalert2";
import {
  getAOrder,
  resetAlert,
  updateStatusOrder,
} from "~/redux/slice/order/OrderSlice";
import "./SingleOrder.scss";
import Loading from "~/admin/component/Loading/Loading";
import CancelOrderModal from "../../component/CancelOrderModal/CancelOrderModal";
import { ToastContainer, toast } from "react-toastify";

const SingleOrder = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const { orderSingle, isLoading, Alert } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAOrder(id));
  }, [dispatch, id]);

  const handelOrder = (e) => {
    e.preventDefault();
    const selectedOptionValue = JSON.parse(e.target.value);
    if (selectedOptionValue.name === "hủy đơn hàng") {
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
      }).then((result) => {
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
  useEffect(() => {
    if (Alert === "Order confirmation successful!") {
      toast.success("Đơn hàng cửa bạn đã được hủy");
      dispatch(getAOrder(id));
      dispatch(resetAlert());
    }
    if (Alert === "Canceled order successfully!") {
      toast.success("Đơn hàng cửa bạn đã được hủy");
      dispatch(getAOrder(id));
      dispatch(resetAlert());
    }
  }, [Alert, dispatch, id]);
  return isLoading ? (
    <Loading />
  ) : (
    <div className="SingleOrderContainer">
      <ToastContainer />
      <div className="top">
        <NavLink to="/admin/order">Back to Orders</NavLink>
      </div>
      <div className="SingleOrder">
        {isModalOpen ? (
          <CancelOrderModal
            orderSingle={orderSingle}
            setIsModalOpen={setIsModalOpen}
            id={id}
          />
        ) : (
          ""
        )}
        <div className="header">
          <div className="header__time">
            <div className="header__time--date">
              <DateRangeIcon />
              <span>{orderSingle.date}</span>
            </div>
            <div className="header__time--Id">Order ID:{orderSingle.code}</div>
          </div>
          {orderSingle.order_status_id === 1 && (
            <div className="header__status">
              <select onChange={(e) => handelOrder(e)}>
                <option>{orderSingle.order_status_name}</option>
                <option value='{"id": 1,"name": "hủy đơn hàng" }'>
                  Hủy đơn hàng
                </option>
                <option value='{ "id": 2, "name": "Xác nhân đơn hàng" }'>
                  Xác nhận đơn hàng
                </option>
              </select>
            </div>
          )}
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
                <div className="info__item--name">
                  {orderSingle.approval?.length > 0 &&
                    orderSingle?.approval[orderSingle?.approval?.length - 1]
                      ?.order_status_name}
                </div>
                <div className="info__item--paid">
                  {orderSingle.approval?.length > 0 &&
                    orderSingle?.approval[orderSingle?.approval?.length - 1]
                      ?.action_time}
                </div>
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
              {(orderSingle.order_status_id === 5 ||
                orderSingle.order_status_id === 6) && (
                <div className="order__footer--des">
                  <div className="des">
                    <WarningIcon />
                    <h4>Lý do hủy đơn hàng</h4>
                  </div>

                  {orderSingle?.approval?.map((item) => {
                    if (item.order_status_name === "Đã hủy") {
                      return item.comment;
                    }
                    return null;
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
