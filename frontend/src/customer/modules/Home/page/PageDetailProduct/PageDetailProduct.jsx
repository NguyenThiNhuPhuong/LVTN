import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DoneIcon from "@mui/icons-material/Done";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { addCart, resetAlert } from "~/redux/slice/cart/CartSlice";
import {
  decreaseProduct,
  getAProduct,
  increaseProduct,
} from "~/redux/slice/product/ProductSlice";

import TabTitle from "~/components/tabtiltle/TabTiltle";
import AllPrice from "../../component/products/component/Price/Price";
import "./PageDetailProduct.scss";
import LoadingDetailProduct from "./component/LoadingDetailProduct/LoadingDetailProduct";

export default function PageDetailProduct() {
  //useSelector get value from redux
  const { productSingle, isLoading } = useSelector((state) => state.product);
  const { alert } = useSelector((state) => state.cart);

  //handel cart
  const decreaseCartItem = (item) => {
    dispatch(decreaseProduct(item));
  };
  const increaseCartItem = (item) => {
    dispatch(increaseProduct(item));
  };

  //title for page
  TabTitle(productSingle?.name || "Chi tiết sản phẩm");

  //declare variable
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  //Alert
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

  //call api
  useEffect(() => {
    dispatch(getAProduct(id));
  }, [dispatch, id]);

  //component PageDetail
  const PageDetail = () => {
    return (
      <div className="PageDetail">
        <ToastContainer />
        <div className="header">
          <a href="/" class="header__logo">
            <h1 class="header__logo--text">Girl Bag</h1>
          </a>
          <div class="header__breadcrumb">
            <a class="" href="/">
              Trang chủ /
            </a>
            <span class="header__breadcrumb--text">{productSingle?.name}</span>
          </div>
        </div>
        <div className="detailProduct" key={productSingle?.id}>
          <div className="detailProduct__img">
            <div className="detailProduct__img--listImg">
              {productSingle.images?.map((img, index) => (
                <img
                  src={img}
                  alt=""
                  className="detailProduct__img"
                  onClick={() => setIndex(index)}
                />
              ))}
            </div>
            <img
              className="detailProduct__img--container"
              src={
                productSingle.images?.length
                  ? productSingle.images[index]
                  : productSingle.images
              }
              alt=""
            />
          </div>

          <div className="detailProduct__box">
            <h2>{productSingle?.name}</h2>
            <AllPrice
              price={productSingle.price}
              price_sale={productSingle.price_sale}
              color="green"
              fontSize="25px"
            />
            <div className="detailProduct__box--amount">
              <div>
                <button
                  type="button"
                  onClick={() => decreaseCartItem(productSingle)}
                >
                  -
                </button>
                <span>{productSingle.cartNum}</span>
                <button
                  type="button"
                  onClick={() => increaseCartItem(productSingle)}
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <h4>Mô tả</h4>
              <p>{productSingle?.description}</p>
            </div>
            <div className="detailProduct__box--btn">
              <button
                className="detailProduct__box--btn--add"
                onClick={() => dispatch(addCart(productSingle))}
              >
                <div className="detailProduct__box--icon">
                  <AddShoppingCartIcon />
                </div>
                Thêm sản phẩm
              </button>

              <button
                className="detailProduct__box--btn--BuyNow"
                onClick={() => dispatch(addCart(productSingle))}
              >
                <div className="detailProduct__box--icon">
                  <DoneIcon />
                </div>

                <NavLink to="/payment">Mua Ngay</NavLink>
              </button>
            </div>
          </div>
        </div>
        {/* <div className="slider__container">
          <Slider {...Settings}>
            {relatedProductList?.map((product, index) => {
              return <Products product={product} key={index} />;
            })}
          </Slider>
        </div> */}
      </div>
    );
  };
  return isLoading ? <LoadingDetailProduct /> : <PageDetail />;
}
