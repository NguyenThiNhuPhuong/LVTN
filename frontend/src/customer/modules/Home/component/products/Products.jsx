import classNames from "classnames/bind";
import styles from "./Products.module.scss";

import { Image } from "cloudinary-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import { addCart, resetAlert } from "~/redux/slice/cart/CartSlice";
import { getAllProducts, setParams } from "~/redux/slice/product/ProductSlice";

import NoProduct from "../noproduct/NoProduct";
import ButtonPriceSale from "./component/ButtonPriceSale/ButtonPriceSale";
import AllPrice from "./component/Price/Price";

const cx = classNames.bind(styles);
const menuPrice = [
  { label: `100.000đ-200.000đ`, valueMin: 100000, valueMax: 200000 },
  { label: `200.000đ-400.000đ`, valueMin: 200000, valueMax: 400000 },
  { label: `400.000đ-600.000đ`, valueMin: 400000, valueMax: 600000 },
  { label: `600.000đ-1000.000đ`, valueMin: 600000, valueMax: 800000 },
  { label: `trên 1.000.000đ`, valueMin: 1000000 },
];
function Products({ productList }) {
  //----------------------useSelector get
  const { categoryList } = useSelector((state) => state.category);
  const { params } = useSelector((state) => state.product);
  const { alert } = useSelector((state) => state.cart);

  //---------------------declare variable
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //---------------------handel Category
  const handelCategory = (e) => {
    e.preventDefault();
    dispatch(setParams({ ...params, category_id: e.target.value }));
    dispatch(getAllProducts(params));
  };

  //---------------------handle Price
  const handelPrice = (e) => {
    e.preventDefault();
    const MinValue = e.target.value.split(",")[0];
    const MaxValue = e.target.value.split(",")[1];
    dispatch(
      setParams({ ...params, min_price: MinValue, max_price: MaxValue })
    );
  };

  //----------------------Alert
  useEffect(() => {
    if (alert === "success") {
      toast.success("Bạn đã thêm thành công sản phẩm vào giỏ hàng", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => dispatch(resetAlert()), 3000);
      setTimeout(() => navigate("/product/shop"), 3000);
    }
    if (alert === "error") {
      toast.error("Rất tiếc sản phẩm k còn đủ số lượng", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => dispatch(resetAlert()), 3000);
    }
  }, [alert, dispatch, navigate]);
  //---------------------component ProductItem
  const ProductItem = () => {
    return (
      <div className={cx("productContainer")}>
        <ToastContainer />

        <div className={cx("title")}>sản phẩm của chúng tôi</div>
        <div className={cx("content")}>
          <div className={cx("sidebar")}>
            <h3>Danh mục sản phẩm</h3>
            {categoryList.map((category, index) => {
              return (
                <div className={cx("sidebar__container")} key={index}>
                  <input
                    type="checkbox"
                    id={category.name}
                    value={category.id}
                    onClick={(e) => handelCategory(e)}
                    checked={
                      parseInt(params.category_id) === parseInt(category.id)
                    }
                  />
                  <label htmlFor={category.name}>{category.name}</label>
                </div>
              );
            })}
            <h3>Sắp xếp theo tên</h3>
            <div className={cx("sidebar__container")}>
              <input type="checkbox" />
              <label>Theo A-Z</label>
            </div>
            <div className={cx("sidebar__container")}>
              <input type="checkbox" />
              <label>Theo Z-A</label>
            </div>
            <h3>Theo giá tiền</h3>

            {menuPrice.map((price, index) => {
              return (
                <div className={cx("sidebar__container")} key={index}>
                  <input
                    type="checkbox"
                    value={`${price.valueMin},${price.valueMax}`}
                    onClick={(e) => handelPrice(e)}
                    checked={
                      parseInt(params.min_price) === parseInt(price.valueMin) &&
                      parseInt(params.max_price) === parseInt(price.valueMax)
                    }
                  />
                  <label>{price.label}</label>
                </div>
              );
            })}
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
        </div>
      </div>
    );
  };
  //handel logic
  return productList.length > 0 ? (
    <ProductItem />
  ) : productList.length === 0 && params !== {} ? (
    <NoProduct title="Không có kết quả tìm kiếm" btn={true} />
  ) : (
    <NoProduct title="Hiện tại không có sản phẩm nào ☹" />
  );
}

export default Products;
