import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import DateRangeIcon from "@mui/icons-material/DateRange";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";

import { ToastContainer, toast } from "react-toastify";
import { FormatNumber } from "~/customer/modules/Home/component/products/component/Price/Price";
import { getAOrder, resetAlert } from "~/redux/slice/order/OrderSlice";
import CancelOrderModal from "../../component/CancelOrderModal/CancelOrderModal";
import Modal from "../../component/Modal/Modal";
import ProductItem from "../../component/ProductItem/ProductItem";
import SideBar from "../../component/SideBar/SideBar";
import "./DetailOrder.scss";

const DetailOrder = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAOrder(id));
  }, [dispatch, id]);
  const { orderSingle, Alert } = useSelector((state) => state.order);
  const [isModal, setIsModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (Alert === "Canceled order successfully!") {
      toast.success("Đơn hàng cửa bạn đã được hủy");
      dispatch(getAOrder(id));
      dispatch(resetAlert());
    }
  }, [dispatch, id, Alert]);
  return (
    <div className="DetailOrderContainer">
      <ToastContainer />
      {isModal ? (
        <Modal orderSingle={orderSingle} setIsModal={setIsModal} />
      ) : (
        ""
      )}
      {isModalOpen ? (
        <CancelOrderModal
          orderSingle={orderSingle}
          setIsModalOpen={setIsModalOpen}
          id={id}
        />
      ) : (
        ""
      )}

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
              {orderSingle.order_status_id === 1 && (
                <div className="header__status">
                  <button onClick={() => setIsModalOpen(true)}>
                    Hủy đơn hàng
                  </button>
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
                    <button
                      onClick={() => setIsModal(true)}
                      disabled={
                        orderSingle.order_status_id === 5 ||
                        orderSingle.order_status_id === 6
                      }
                    >
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
