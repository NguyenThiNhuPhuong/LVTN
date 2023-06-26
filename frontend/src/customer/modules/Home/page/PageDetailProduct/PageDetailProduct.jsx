import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DoneIcon from "@mui/icons-material/Done";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { addCart, resetAlert, resetCart } from "~/redux/slice/cart/CartSlice";
import {
  decreaseProduct,
  getAProduct,
  increaseProduct,
} from "~/redux/slice/product/ProductSlice";

import Slider from "react-slick";
import TabTitle from "~/components/tabtiltle/TabTiltle";
import { getAllProducts } from "~/redux/slice/product/ProductSlice";
import AllPrice from "../../component/products/component/Price/Price";
import "./PageDetailProduct.scss";
import LoadingDetailProduct from "./component/LoadingDetailProduct/LoadingDetailProduct";
import Product from "../../component/products/component/Product/Product";

export default function PageDetailProduct() {
  //useSelector get value from redux
  const { productSingle, isLoading, productList } = useSelector(
    (state) => state.product
  );
  const { alert } = useSelector((state) => state.cart);
  //
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }

  const Settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false, // Move the dots property inside the settings object
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          nextArrow: false,
          prevArrow: false,
        },
      },
    ],
  };

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
    dispatch(getAllProducts({ category_id: id }));
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
                <button
                  onClick={() => {
                    dispatch(resetCart());
                    dispatch(addCart(productSingle));
                  }}
                >
                  <NavLink to="/payment">Mua Ngay</NavLink>
                </button>
              </button>
            </div>
          </div>
        </div>
        {/* {productList.length > 0 ? (
          <div className="slider__container">
            <h1>Sản phẩm liên quan</h1>
            <Slider {...Settings}>
              {productList?.map((product, index) => {
                return (
                  <Product product={product} key={index} btnCart={false} />
                );
              })}
            </Slider>
          </div>
        ) : (
          ""
        )} */}
      </div>
    );
  };
  return isLoading ? <LoadingDetailProduct /> : <PageDetail />;
}
