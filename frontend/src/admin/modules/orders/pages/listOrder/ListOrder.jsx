import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loading from "~/admin/component/Loading/Loading";
import Top from "~/admin/layouts/component/top/Top";
import OrderItem from "../../component/OrderItem/OrderItem";

import { getListOrder } from "~/redux/slice/order/OrderSlice";

import "./ListOrder.scss";

function ListOrder() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getListOrder(0));
  }, [dispatch]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="ListOrderContainer">
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
          <OrderItem />
        </div>
      </div>
    </div>
  );
}

export default ListOrder;
