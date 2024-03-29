import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkDiscount, setCode } from "~/redux/slice/discount/DiscountSlice";

function DiscountInput() {
  const dispatch = useDispatch();
  const { code, discount, codeName } = useSelector((state) => state.discount);
  const { orderNew } = useSelector((state) => state.order);

  //-------------------handel discount
  const handelDiscount = (e) => {
    e.preventDefault();
    dispatch(
      checkDiscount({
        code,
        price_product: orderNew.price_product,
      })
    );
    dispatch(setCode(""));
  };
  return (
    <div className="sidebar-content">
      <div className="discount">
        <input
          className="discount__input"
          placeholder="Nhập mã giảm giá"
          value={code}
          onChange={(e) => dispatch(setCode(e.target.value))}
        />
        <button
          className="discount__button"
          onClick={(e) => handelDiscount(e)}
          type="button"
        >
          Áp dụng
        </button>
        {discount ? (
          <div className="discount__code">
            <div className="discount__code--content">{codeName}</div>
            <div
              className="discount__code--delete"
              onClick={(e) => dispatch(setCode())}
            >
              x
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default DiscountInput;
