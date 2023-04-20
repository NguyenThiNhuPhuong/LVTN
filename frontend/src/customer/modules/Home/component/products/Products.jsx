import classNames from "classnames/bind";
import styles from "./Products.module.scss";

import { Image } from "cloudinary-react";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import { addCart } from "~/redux/slice/cart/CartSlice";
import ButtonPriceSale from "./component/ButtonPriceSale/ButtonPriceSale";
import AllPrice from "./component/Price/Price";
import Loading from "../loading/Loading";

const cx = classNames.bind(styles);

function Products({ product, key }) {
  const dispatch = useDispatch();

  return product ? (
    <div className={cx("product__item")} key={key}>
      <ButtonPriceSale price={product.price} price_sale={product.price_sale} />

      <NavLink to={`/product/${product.id}`}>
        <Image
          className={cx("product__item--img")}
          cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
          publicId={product.images[1]}
        />
      </NavLink>

      <div className={cx("product__item--content")}>
        <Link
          className={cx("product__item--title")}
          to={`/product/detail/${product.id}`}
        >
          {product.name}
        </Link>
        <AllPrice price={product.price} price_sale={product.price_sale} />
        <button
          className={cx("product__item--button")}
          onClick={() => {
            dispatch(addCart(product));
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Products;
