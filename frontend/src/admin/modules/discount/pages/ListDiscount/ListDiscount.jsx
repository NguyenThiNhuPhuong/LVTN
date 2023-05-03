import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "~/admin/component/Loading/Loading";
import Top from "~/admin/layouts/component/top/Top";
import { getDiscounts } from "~/redux/slice/discount/DiscountSlice";
import "./ListDiscount.scss";
import DiscountItem from "../../component/DiscountItem/DiscountItem";
const ListDiscount = () => {
  const { isLoading } = useSelector((state) => state.discount);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDiscounts());
  }, [dispatch]);

  const Discount = () => {
    return (
      <div className="ListDiscountContainer">
        <Top title="Danh sách người dùng" to="newDiscount" />
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
      </div>
    );
  };

  return isLoading ? <Loading /> : <Discount />;
};

export default ListDiscount;
