import { DeleteOutlined } from "@ant-design/icons";
import ClearIcon from "@mui/icons-material/Clear";

import { Image } from "cloudinary-react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  decreaseCart,
  increaseCart,
  removeCart,
} from "~/redux/slice/cart/CartSlice";
import "./CartItem.scss";
import { Price } from "~/customer/modules/Home/component/products/component/Price/Price";

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
        <div className="cart__row table__section" key={index}>
          <div className="cart__row--image">
            <NavLink to={`/product/detail/${item._id}`}>
              <Image
                cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                publicId={item.images[0]}
              />
            </NavLink>
          </div>
          <div className="cart__row--product">
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
            <button
              className="cart__row--remove-icon"
              type="button"
              onClick={() => {
                removeCartItem(item);
              }}
            >
              <ClearIcon />
            </button>
          </div>
          <div className="cart__row--price">
            <Price price={item.price} price_sale={item.price_sale} />
          </div>
          <div className="cart__row--amount">
            <div>
              <button type="button" onClick={() => decreaseCartItem(item)}>
                -
              </button>
              <span>{item.cartNum}</span>
              <button type="button" onClick={() => increaseCartItem(item)}>
                +
              </button>
            </div>
          </div>
          <div className="cart__row--total">
            <Price
              price={item.price * item.cartNum}
              price_sale={item.price_sale * item.cartNum}
            />
          </div>
        </div>
      ))}
    </>
  );
}

CartItem.propTypes = {};

export default CartItem;
