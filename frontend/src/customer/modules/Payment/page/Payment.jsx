import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import TabTitle from "~/components/tabtiltle/TabTiltle";
import Field from "../component/Field/Field";
import "./Payment.scss";

import Swal from "sweetalert2";
import { setUserInfo } from "~/redux/slice/auth/AuthSlice";
import { totalAllCart, totalCart } from "~/redux/slice/cart/CartSlice";
import { checkDiscount, setCode } from "~/redux/slice/discount/DiscountSlice";
import { newOrder } from "~/redux/slice/order/OrderSlice";
import Login from "../../Auth/page/login/Login";
import {
  FormatNumber,
  Price,
} from "../../Home/component/products/component/Price/Price";
import Address from "../component/address/Address";

export default function Payment() {
  TabTitle("Thanh toán");

  const { priceCart, listCart, priceShip, priceAllCart } = useSelector(
    (state) => state.cart
  );
  const { code, discount } = useSelector((state) => state.discount);
  const { isSuccessNew } = useSelector((state) => state.order);

  const { token, userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccessNew === true) {
      localStorage.removeItem("cart");
      Swal.fire({
        title: "Thank You!",
        text: "Bạn đã đặt hàng thành công!",
        icon: "success",
      });
      setTimeout(() => navigate("/product/shop"), 3000);
    }
  }, [isSuccessNew, navigate]);
  useEffect(() => {
    const res = listCart.reduce((total, item) => {
      return (
        total +
        (item.price_sale > 0
          ? item.price_sale * item.cartNum
          : item.price * item.cartNum)
      );
    }, 0);
    dispatch(totalCart(res));
    dispatch(totalAllCart(res + priceShip - discount));
  }, [discount, dispatch, listCart, priceShip]);
  const handelDiscount = (e) => {
    e.preventDefault();
    dispatch(
      checkDiscount({
        code,
        price_product: priceCart,
      })
    );
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    dispatch(
      newOrder({
        ...userInfo,
        price_product: priceCart,
        price_ship: priceShip,
        price_all: priceAllCart,
        cart: listCart,
      })
    );
  };
  return token ? (
    <div className="PaymentContainer">
      <div className="row">
        <div className="main">
          <div className="header">
            <a href="/" className="header__logo">
              <h1 className="logo-text">Girl Bag</h1>
            </a>

            <ul className="header__breadcrumb">
              <li className="header__breadcrumb--item header__breadcrumb--item-current">
                <NavLink to="/cart">Giỏ hàng</NavLink>
              </li>
              <li className="header__breadcrumb--item header__breadcrumb--item-current">
                Thông tin giao hàng
              </li>
            </ul>
          </div>
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
                    <div className="fieldset">
                      <Field
                        className={"field__required"}
                        label={"Họ và tên"}
                        type={"text"}
                        value={userInfo.name}
                        onChange={(e) =>
                          dispatch(
                            setUserInfo({ ...userInfo, name: e.target.value })
                          )
                        }
                      />
                      <Field
                        className={"field-two-thirds"}
                        label={"Email"}
                        type={"text"}
                        value={userInfo.email}
                        onChange={(e) =>
                          dispatch(
                            setUserInfo({ ...userInfo, email: e.target.value })
                          )
                        }
                      />
                      <Field
                        className={"field-required field-third"}
                        label={"Số điện thoại"}
                        type={"text"}
                        value={userInfo.phone}
                        onChange={(e) =>
                          dispatch(
                            setUserInfo({ ...userInfo, phone: e.target.value })
                          )
                        }
                      />
                      <Address />
                    </div>
                  </div>
                  <div className="section">
                    <div className="section__header">
                      <h2 className="section__title">Phương thức thanh toán</h2>
                    </div>
                    <div className="section__content">
                      <div className="content__box">
                        <div className="radio__wrapper content__box--row">
                          <label className="radio__label">
                            <div className="radio__input">
                              <input
                                className="radio__input--radio"
                                type="radio"
                                checked
                              />
                            </div>
                            <div className="radio__content">
                              <img
                                className="radio__content--img"
                                src="https://hstatic.net/0/0/global/design/seller/image/payment/cod.svg?v=1"
                                alt=""
                              />
                              <div>
                                <span className="radio__content--label  ">
                                  Thanh toán khi giao hàng (COD)
                                </span>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
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
        </div>
        <div className="container">
          <div className="sidebar">
            {listCart.map((item) => (
              <div className="sidebar-content" key={item._id}>
                <table className="product-table">
                  <tbody>
                    <tr className="productItem">
                      <td className="productItem__thumbnail">
                        <img
                          src={item.images[1]}
                          alt=""
                          className="productItem__thumbnail--image"
                        />
                        <div className="productItem__thumbnail--quantity">
                          {item.cartNum}
                        </div>
                      </td>
                      <td className="productItem__descriptions">
                        <div className="productItem__description">
                          <div className="productItem__description--name">
                            {item.name}
                          </div>
                          <div className="productItem__description--price">
                            <Price
                              price={item.price}
                              price_sale={item.price_sale}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="productItem__price">
                        <div className="productItem__price--des">
                          <Price
                            price={item.price * item.cartNum}
                            price_sale={item.price_sale * item.cartNum}
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
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
                >
                  Áp dụng
                </button>
                {discount ? (
                  <div className="discount__code">
                    <div>{code}</div>
                    <div
                      className="discount__code--detele"
                      onClick={(e) => dispatch(setCode(0))}
                    >
                      x
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="sidebar-content">
              <table className="product-table">
                <tbody>
                  <tr className="productItem__total">
                    <td className="total-line-name">Tạm tính</td>
                    <td className="total-line-price">
                      <div>
                        <FormatNumber price={priceCart} />
                      </div>
                    </td>
                  </tr>

                  <tr className="productItem__total">
                    <td className="total-line-name">Phí vận chuyển</td>
                    <td className="total-line-price">
                      <div>
                        <FormatNumber price={priceShip} />
                      </div>
                    </td>
                  </tr>
                  <tr className="productItem__total">
                    <td className="total-line-name">Discount</td>
                    <td className="total-line-price">
                      <div>
                        <FormatNumber price={discount} />
                      </div>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="productItem__total">
                    <td>
                      <strong>Tổng cộng:</strong>
                    </td>
                    <td className="total-line-price">
                      <strong
                        style={{
                          fontSize: "1.6rem",
                        }}
                      >
                        <FormatNumber
                          price={priceCart + priceShip - discount}
                        />
                      </strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Login />
  );
}
