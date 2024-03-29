import React from "react";
import { NavLink } from "react-router-dom";
import FieldSet from "../FieldSet/FieldSet";
import Method from "../method/Method";
import { useDispatch, useSelector } from "react-redux";
import { newOrder } from "~/redux/slice/order/OrderSlice";

function Form() {
  const dispatch = useDispatch();
  const { priceCart, listCart, priceShip, priceAllCart } = useSelector(
    (state) => state.cart
  );

  const { orderNew } = useSelector((state) => state.order);
  const { code_id, discount } = useSelector((state) => state.discount);
  //   const { code_id, discount } = useSelector((state) => state.discount);
  //------------handelSubmit
  //   console.log(discount);
  console.log(orderNew);

  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(
      newOrder({
        ...orderNew,
        price_product: orderNew.price_product - discount,
        price_ship: priceShip,
        price_all:
          orderNew.price_product - discount > 0
            ? orderNew.price_product - discount + priceShip
            : priceShip,
        cart: listCart,
        discount_id: code_id,
      })
    );
  };
  return (
    <form className="content" onSubmit={(e) => handelSubmit(e)}>
      <div className="step">
        <div className="step-sections">
          <div className="section">
            <div className="section__header">
              <h2 className="section__title">Thông tin giao hàng</h2>
            </div>
            <div className="section__content no-mb">
              <p className="section__content--text">
                Bạn đã có tài khoản?
                <NavLink to="signin"> Đăng nhập</NavLink>
              </p>
              <FieldSet />
            </div>
            <Method />
          </div>
        </div>
        <div className="step-footer">
          <NavLink to="/cart">Giỏ hàng</NavLink>
          <div>
            <button className="btn" type="submit">
              <span className="btn__content">Hoàn tất đơn hàng</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Form;
