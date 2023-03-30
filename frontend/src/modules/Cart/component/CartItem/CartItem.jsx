import { DeleteOutlined } from "@ant-design/icons";
import { Image } from "cloudinary-react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Price } from "~/modules/Home/component/products/component/Price/Price";
import {
  decreaseCart,
  increaseCart,
  removeCart,
} from "~/redux/slice/cart/CartSlice";
import "./CartItem.scss";

function CartItem() {
  const cart = useSelector((state) => state.cart.listCart);

  const dispatch = useDispatch();
  const removeCartItem = (item) => {
    dispatch(removeCart(item));
  };
  const decreaseCartItem = (item) => {
    dispatch(decreaseCart(item));
  };
  const increaseCartItem = (item) => {
    dispatch(increaseCart(item));
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
                type="button"
                onClick={() => {
                  removeCartItem(item);
                }}
              >
                <DeleteOutlined />
              </button>
            </td>
            <td className="cart__row--price">
              <Price price={item.price} price_sale={item.price_sale} />
            </td>
            <td className="cart__row--amount">
              <div>
                <button type="button" onClick={() => decreaseCartItem(item)}>
                  -
                </button>
                <span>{item.cartNum}</span>
                <button type="button" onClick={() => increaseCartItem(item)}>
                  +
                </button>
              </div>
            </td>
            <td className="cart__row--price">
              <span style={{ color: "black", fontSize: "2rem" }}>
                <Price
                  price={item.price * item.cartNum}
                  price_sale={item.price_sale * item.cartNum}
                />
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
