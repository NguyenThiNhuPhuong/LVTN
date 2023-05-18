import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "~/admin/component/Loading/Loading";
import Top from "~/admin/layouts/component/top/Top";
import { getDiscounts, setParams } from "~/redux/slice/discount/DiscountSlice";
import "./ListDiscount.scss";
import DiscountItem from "../../component/DiscountItem/DiscountItem";
import Pagination from "~/admin/layouts/component/Pagination/Pagination";
const ListDiscount = () => {
  const { isLoading, currentPage, totalPages, params } = useSelector(
    (state) => state.discount
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDiscounts(params));
  }, [dispatch, params]);
  //-----------------change Page---------------------------------------
  const handlePageChange = (e, pageNumber) => {
    e.preventDefault();
    dispatch(setParams({ ...params, page: pageNumber }));
  };
  const Discount = () => {
    return (
      <div className="ListDiscountContainer">
        <Top title="Danh sách Discount" to="newDiscount" />
        <div className="discount">
          <div className="discount__row discount__header-labels">
            <div className="text-center">ID</div>
            <div className="text-center">Name</div>
            <div className="text-center">Số lượng </div>
            <div className="text-center">Ngày Tạo</div>

            <div className="text-center">Ngày Hết hạn</div>
            <div className="text-center">Action</div>
          </div>
          <DiscountItem />
        </div>
        {totalPages > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    );
  };

  return isLoading ? <Loading /> : <Discount />;
};

export default ListDiscount;
