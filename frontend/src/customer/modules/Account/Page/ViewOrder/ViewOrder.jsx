import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loading from "~/admin/component/Loading/Loading";

import { getListOrder } from "~/redux/slice/order/OrderSlice";

import DataTable from "../../component/DataTable/DataTable";
import "./ViewOrder.scss";
import SideBar from "../../component/SideBar/SideBar";

function ViewOrder() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getListOrder(0));
  }, [dispatch]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="ListOrderContainer">
      <div className="main">
        <SideBar />
        <div className="order">
          <div className="order__row order__header-labels">
            <div className="text-center order__row--name">Họ và tên</div>
            <div className="text-center order__row--email">Email</div>
            <div className="text-center order__row--total">Tổng tiền</div>
            <div className="text-center order__row--date">Date</div>
            <div className="text-center order__row--status">Status</div>
            <div className="text-center order__row--action">Action</div>
          </div>
          <DataTable />
        </div>
      </div>
    </div>
  );
}

export default ViewOrder;
