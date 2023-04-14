import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import TabTitle from "~/components/tabtiltle/TabTiltle";
import "./Cart.scss";
import NoProduct from "../../Home/component/noproduct/NoProduct";
import CartItem from "../component/CartItem/CartItem";
import { FormatNumber } from "../../Home/component/products/component/Price/Price";

function Cart(props) {
  TabTitle("Giỏ hàng");
  const cart = useSelector((state) => state.cart.listCart);

  const [total, setTotal] = useState(0);
  /// total bill
  useEffect(() => {
    const res = cart.reduce((total, item) => {
      return (
        total +
        (item.price_sale > 0
          ? item.price_sale * item.cartNum
          : item.price * item.cartNum)
      );
    }, 0);
    setTotal(res);
  }, [cart]);

  if (cart.length === 0) {
    return <NoProduct />;
  } else {
    return (
      <>
        <div className="container__wrapper">
          <div className="header">
            <a href="/" className="header__logo">
              <h1 className="header__logo--text">Girl Bag</h1>
            </a>
            <div className="header__breadcrumb">
              <NavLink to="/">Trang chủ /</NavLink>
              <span className="header__breadcrumb--text">Giỏ hàng của bạn</span>
            </div>
          </div>
          <form className="cart">
            <table className="cart__table">
              <div className="cart__row cart__header-labels">
                <div className="text-center">Thông tin chi tiết sản phẩm</div>
                <div className="text-center"></div>

                <div className="text-center">Đơn giá</div>
                <div className="text-center">Số lượng</div>
                <div className="text-center">Tổng giá</div>
              </div>
              <CartItem cart={cart} />
            </table>
            <div className="cart__footer">
              <div className="cart__footer--note">
                <label>Chú thích cho cửa hàng</label>
                <textarea />
              </div>

              <div className="cart__footer--total">
                <p className="cart__footer--total--title">
                  <span>Tổng tiền:</span>
                  <span className="h3">
                    <FormatNumber price={total} />
                  </span>
                </p>
                <div className="cart__footer--total--btn">
                  <button type="submit" className="btnCart update-cart">
                    <NavLink to="/product/shop"> Cập nhật</NavLink>
                  </button>
                  <button type="submit" className="btnCart">
                    <NavLink to="/payment"> Thanh toán</NavLink>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
}

Cart.propTypes = {};

export default Cart;
