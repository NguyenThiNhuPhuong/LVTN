import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loading from "~/admin/component/Loading/Loading";
import Top from "~/admin/layouts/component/top/Top";
import OrderItem from "../../component/OrderItem/OrderItem";

import { getListOrder, setParams } from "~/redux/slice/order/OrderSlice";

import "./ListOrder.scss";
import Pagination from "~/admin/layouts/component/Pagination/Pagination";
import StatusSelect from "../../component/StatusSelect/StatusSelect";

function ListOrder() {
  const dispatch = useDispatch();
  const { isLoading, currentPage, totalPages, params } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getListOrder(params));
  }, [dispatch, params]);
  console.log(params);
  //-----------------change Page---------------------------------------
  const handlePageChange = (e, pageNumber) => {
    e.preventDefault();
    console.log(pageNumber);

    dispatch(setParams({ ...params, page: pageNumber }));
  };
  return isLoading ? (
    <Loading />
  ) : (
    <div className="ListOrderContainer">
      <Top title="Orders" to="/admin/product/newProduct" />
      <div className="content">
        <StatusSelect />
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
        {totalPages > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}

export default ListOrder;
