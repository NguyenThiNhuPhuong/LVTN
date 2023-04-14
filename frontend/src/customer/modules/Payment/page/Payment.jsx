import { Image } from "cloudinary-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Payment.scss";
import { useSelector } from "react-redux";
import TabTitle from "~/components/tabtiltle/TabTiltle";
import Field from "../component/Field/Field";

import Address from "../component/address/Address";
import {
  FormatNumber,
  Price,
} from "../../Home/component/products/component/Price/Price";

export default function Payment() {
  TabTitle("Thanh toán");
  const cart = useSelector((state) => state.cart.listCart);

  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const [total, setTotal] = useState(0);
  const [priceAll, setPriceall] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [search, setSearch] = useState();
  const [code, setCode] = useState();
  const [codeDiscount, setCodeDiscount] = useState();

  const priceShip = 30000;
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
  return (
    <>
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
          <div className="content">
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
                      />
                      <Field
                        className={"field-two-thirds"}
                        label={"Email"}
                        type={"text"}
                      />
                      <Field
                        className={"field-required field-third"}
                        label={"Số điện thoại"}
                        type={"text"}
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
                  <button className="btn">
                    <span className="btn__content">Hoàn tất đơn hàng</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="sidebar">
            {cart.map((item) => (
              <div key={item._id}>
                <div className="sidebar-content">
                  <table className="product-table">
                    <tbody>
                      <tr className="productItem">
                        <td className="productItem__thumbnail">
                          <Image
                            className="productItem__thumbnail--image"
                            cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                            publicId={item.images[1]}
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
              </div>
            ))}
            <div className="sidebar-content">
              <div className="discount">
                <input
                  className="discount__input"
                  placeholder="Nhập mã giảm giá"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <button className="discount__button">Áp dụng</button>
                {/* {discount ? (
                  <div
                    style={{
                      display: "flex",
                      border: "1px solid #e1e1e1",
                      borderRadius: "5px",
                      backgroundColor: "lightblue",
                      padding: "3px",
                      marginTop: "5px",
                      width: "150px",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <div>{codeDiscount}</div>
                    <div
                      onClick={() => setDiscount(0)}
                      style={{
                        position: "absolute",
                        display: "flex",
                        justifyContent: "ceter",
                        alignItems: "center",
                        height: "8px",
                        top: "3px",
                        right: "3px",
                      }}
                    >
                      x
                    </div>
                  </div>
                ) : (
                  ""
                )} */}
              </div>
            </div>
            <div className="sidebar-content">
              <table className="product-table">
                <tbody>
                  <tr className="productItem__total">
                    <td className="total-line-name">Tạm tính</td>
                    <td className="total-line-price">
                      <div>
                        <FormatNumber price={total} />
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
                        <FormatNumber price={total + priceShip - discount} />
                      </strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
