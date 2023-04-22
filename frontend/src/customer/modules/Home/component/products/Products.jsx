import classNames from "classnames/bind";
import styles from "./Products.module.scss";

import { Image } from "cloudinary-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import { addCart } from "~/redux/slice/cart/CartSlice";
import NoProduct from "../noproduct/NoProduct";
import ButtonPriceSale from "./component/ButtonPriceSale/ButtonPriceSale";
import AllPrice from "./component/Price/Price";

const cx = classNames.bind(styles);

function Products() {
  const { productList } = useSelector((state) => state.product);
  const { categoryList } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  return productList.length > 0 ? (
    <>
      <div className={cx("sidebar")}>
        <h3>Danh mục sản phẩm</h3>
        {categoryList.map((category, index) => {
          return (
            <div className={cx("sidebar__container")} key={index}>
              <input type="checkbox" checked="checked" id={category.name} />
              <label for={category.name}>{category.name}</label>
            </div>
          );
        })}
        <h3>Sắp xếp theo tên</h3>
        <div className={cx("sidebar__container")}>
          <input type="checkbox" checked="checked" />
          <label>Theo A-Z</label>
        </div>
        <div className={cx("sidebar__container")}>
          <input type="checkbox" checked="checked" />
          <label>Theo Z-A</label>
        </div>
        <h3>Theo giá tiền</h3>
        <div className={cx("sidebar__container")}>
          <input type="checkbox" checked="checked" />
          <label>Tăng dần</label>
        </div>
        <div className={cx("sidebar__container")}>
          <input type="checkbox" checked="checked" />
          <label>Giảm dần</label>
        </div>
      </div>
      <div className={cx("product")}>
        {productList.map((product, index) => {
          return (
            <div className={cx("product__item")} key={index}>
              <ButtonPriceSale
                price={product.price}
                price_sale={product.price_sale}
              />

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
                <AllPrice
                  price={product.price}
                  price_sale={product.price_sale}
                />
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
          );
        })}
      </div>
    </>
  ) : (
    <NoProduct />
  );
}

export default Products;
