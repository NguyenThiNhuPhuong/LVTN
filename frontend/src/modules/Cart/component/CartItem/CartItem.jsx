import { DeleteOutlined } from "@ant-design/icons";
import { Image } from "cloudinary-react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  decreaseCart,
  increaseCart,
  removeCart,
} from "~/redux/slice/cart/CartSlice";
import "./CartItem.scss";

function CartItem() {
  const cart = useSelector((state) => state.cart.listCart);

  const dispatch = useDispatch();
  const decreaseCartItem = (item, e) => {
    return e.defaultPrevented(), dispatch(decreaseCart(item));
  };
  const increaseCartItem = (item, e) => {
    return e.defaultPrevented(), dispatch(increaseCart(item));
  };
  return (
    <>
      {cart?.map((item, index) => (
        <tbody key={index}>
          <tr className="cart__row table__section">
            <td className="cart__row--image">
              <NavLink to={`/product/detail/${item._id}`}>
                <Image
                  cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                  publicId={item.images[0]}
                />
              </NavLink>
            </td>
            <td className="cart__row--product">
              <NavLink to={`/product/detail/${item._id}`} className="h4">
                {item.name}
              </NavLink>
              <button
                className="cart__row--remove"
                onClick={(e) => {
                  e.defaultPrevented();
                  dispatch(removeCart(item));
                }}
              >
                <DeleteOutlined />
              </button>
            </td>
            <td className="cart__row--price">
              {(item.price_sale > 0
                ? item.price_sale
                : item.price
              ).toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </td>
            <td className="cart__row--amount">
              <div>
                <button onClick={() => decreaseCartItem(item)}>-</button>
                <span>{item.cartNum}</span>
                <button onClick={() => increaseCartItem(item)}>+</button>
              </div>
            </td>
            <td className="cart__row--price">
              <span style={{ color: "black", fontSize: "2rem" }}>
                {(item.price_sale > 0
                  ? item.price_sale * item.cartNum
                  : item.price * item.cartNum
                ).toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </td>
          </tr>
        </tbody>
      ))}
    </>
  );
}

CartItem.propTypes = {};

export default CartItem;
