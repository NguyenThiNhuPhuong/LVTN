import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import DateRangeIcon from "@mui/icons-material/DateRange";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";

import { FormatNumber } from "~/customer/modules/Home/component/products/component/Price/Price";

import Swal from "sweetalert2";
import { getAOrder, updateStatusOrder } from "~/redux/slice/order/OrderSlice";
import ProductItem from "../../component/ProductItem/ProductItem";
import SideBar from "../../component/SideBar/SideBar";
import "./DetailOrder.scss";

const DetailOrder = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAOrder(id));
  }, [dispatch, id]);
  const { orderSingle } = useSelector((state) => state.order);
  const [isModal, setIsModal] = useState(false);
  const statuses = [
    "Chờ xác nhận",
    "Đã được xác nhận",
    "Chờ lấy hàng",
    "Đang giao",
    "Đã giao",
  ];

  const handelOrder = (e) => {
    e.preventDefault();
    const selectedOptionValue = JSON.parse(e.target.value);

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
  };
  const Modal = () => {
    const statusId =
      orderSingle.approval[orderSingle.approval?.length - 1].order_status_id;
    return (
      <form className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h3>Thông tin đơn hàng</h3>
            <span className="close" onClick={(e) => setIsModal(false)}>
              &times;
            </span>
          </div>
          <div className="modal-body">
            {statuses.map((status, index) => (
              <div className="item">
                <div
                  className="item__line"
                  style={{
                    "--color": index + 1 === statusId ? "green" : "gray",
                  }}
                ></div>
                <div
                  key={index}
                  style={{ color: index + 1 <= statusId ? "green" : "gray" }}
                >
                  <div>{status}</div>
                  <div>
                    {orderSingle.approval?.length > 0 &&
                      orderSingle?.approval[index]?.action_time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    );
  };
  return (
    <div className="DetailOrderContainer">
      {isModal ? <Modal /> : ""}
      <div className="main">
        <SideBar />
        <div className="content">
          <div className="SingleOrder">
            <div className="header">
              <div className="header__time">
                <div className="header__time--date">
                  <DateRangeIcon />
                  <span>{orderSingle.date}</span>
                </div>
                <div className="header__time--Id">
                  Order ID:{orderSingle.code}
                </div>
              </div>
              <div className="header__status">
                <select onChange={handelOrder}>
                  <option>{orderSingle.order_status_name}</option>
                  <option value='{"id": 5,"name": "hủy đơn hàng" }'>
                    Hủy đơn hàng
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
                    <button onClick={() => setIsModal(true)}>
                      <div className="info__item--name">
                        {orderSingle.approval?.length > 0 &&
                          orderSingle?.approval[
                            orderSingle?.approval?.length - 1
                          ]?.order_status_name}
                      </div>
                    </button>
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
                    <div className="info__item--address">
                      {orderSingle.address}
                    </div>
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
      </div>
    </div>
  );
};

export default DetailOrder;
