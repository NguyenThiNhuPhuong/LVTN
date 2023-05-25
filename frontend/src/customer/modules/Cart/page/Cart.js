import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import TabTitle from "~/components/tabtiltle/TabTiltle";
import { setUserInfo } from "~/redux/slice/auth/AuthSlice";
import { totalCart } from "~/redux/slice/cart/CartSlice";
import { FormatNumber } from "../../Home/component/products/component/Price/Price";
import CartItem from "../component/CartItem/CartItem";
import CartNoProduct from "../component/CartNoProduct/CartNoProduct";
import "./Cart.scss";

function Cart() {
  TabTitle("Giỏ hàng");
  const { listCart, priceCart } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  /// total bill
  useEffect(() => {
    const res = listCart?.reduce((total, item) => {
      return (
        total +
        (item.price_sale > 0
          ? item.price_sale * item.cartNum
          : item.price * item.cartNum)
      );
    }, 0);
    dispatch(totalCart(res));
  }, [listCart, dispatch]);

  if (listCart.length === 0) {
    return <CartNoProduct />;
  } else {
    return (
      <div className="CartContainer">
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
              <CartItem />
            </table>
            <div className="cart__footer">
              <div className="cart__footer--note">
                <label>Chú thích cho cửa hàng</label>
                <textarea
                  value={userInfo?.note}
                  onChange={(e) =>
                    dispatch(setUserInfo({ ...userInfo, note: e.target.value }))
                  }
                />
              </div>

              <div className="cart__footer--total">
                <p className="cart__footer--total--title">
                  <span>Tổng tiền:</span>
                  <span className="h3">
                    <FormatNumber price={priceCart} />
                  </span>
                </p>
                <div className="cart__footer--total--btn">
                  <button type="submit" className="btnCart">
                    <NavLink to="/payment"> Thanh toán</NavLink>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Cart.propTypes = {};

export default Cart;
