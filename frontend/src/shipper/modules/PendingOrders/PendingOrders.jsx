import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Top from "~/admin/layouts/component/top/Top";

import { getListOrder } from "~/redux/slice/order/OrderSlice";

import "./PendingOrders.scss";
import Loading from "~/admin/component/Loading/Loading";
import OrderItem from "../component/OrderItem/OrderItem";

function PendingOrders() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.order);
  const { orderList } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(getListOrder(2));
  }, [dispatch]);
  const Order = () => {
    return (
      <div className="ListPendingOrderContainer">
        <Top title="Orders" to="/admin/product/newProduct" />
        <div className="main">
          <div className="header">
            <div className="search">
              <input className="search__input" placeholder="Search....." />
            </div>
            <div className="sort">
              <select className="sort sort-category">
                <option value="">All category</option>
              </select>
              <select className="sort sort-timeLast">
                <option value="">Latest added</option>
              </select>
            </div>
          </div>
          <hr />
          <div className="order">
            <div className="order__row order__header-labels">
              <div className="text-center">Họ và tên</div>
              <div className="text-center">Email</div>
              <div className="text-center">Số điện thoại</div>
              <div className="text-center">Tổng tiền</div>
              <div className="text-center">Date</div>
              <div className="text-center">Status</div>
              <div className="text-center">Action</div>
            </div>
            <OrderItem orderList={orderList} />
          </div>
        </div>
      </div>
    );
  };
  return isLoading ? <Loading /> : <Order />;
}

export default PendingOrders;
