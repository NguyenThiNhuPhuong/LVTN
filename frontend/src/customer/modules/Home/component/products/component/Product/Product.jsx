import React from "react";
import ButtonPriceSale from "../ButtonPriceSale/ButtonPriceSale";
import { Link, NavLink } from "react-router-dom";
import { Image } from "cloudinary-react";
import AllPrice from "../Price/Price";
import { useDispatch } from "react-redux";
import { addCart } from "~/redux/slice/cart/CartSlice";
import "./Product.scss";

function Product({ product, btnCart }) {
  const dispatch = useDispatch();

  return (
    <div className="product__item" key={product.id}>
      <ButtonPriceSale price={product.price} price_sale={product.price_sale} />

      <NavLink to={`/product/${product.id}`}>
        <Image
          className="product__item--img"
          cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
          publicId={product.images[1]}
        />
      </NavLink>

      <div className="product__item--content">
        <Link className="product__item--title" to={`/product/${product.id}`}>
          {product.name}
        </Link>
        <AllPrice price={product.price} price_sale={product.price_sale} />
        {btnCart === false ? (
          ""
        ) : (
          <button
            className="product__item--button"
            onClick={() => {
              dispatch(addCart(product));
            }}
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default Product;
