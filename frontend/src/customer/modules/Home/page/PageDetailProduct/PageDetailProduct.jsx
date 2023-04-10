import { Image } from "cloudinary-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

import TabTitle from "~/components/tabtiltle/TabTiltle";
import { addCart } from "~/redux/slice/cart/CartSlice";
import {
  getAProduct,
  removeLatedProductList,
} from "~/redux/slice/product/ProductSlice";
import Loading from "../../component/loading/Loading";
import { Price } from "../../component/products/component/Price/Price";
import "./PageDetailProduct.scss";

export default function PageDetailProduct() {
  const selectProductShow = useSelector(
    (state) => state.product.selectProductShow
  );
  const relatedProductList = useSelector(
    (state) => state.product.relatedProductList
  );

  const { id } = useParams();
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);

  TabTitle(selectProductShow?.name || "Chi tiết sản phẩm");

  useEffect(() => {
    dispatch(getAProduct(id, dispatch));
    return () => {
      dispatch(removeLatedProductList());
    };
  }, [dispatch, id]);

  return selectProductShow ? (
    <>
      <div className="detailProduct" key={selectProductShow?.id}>
        <div className="detailProduct__img">
          <Image
            className="detailProduct__img--container"
            cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
            publicId={
              selectProductShow.images?.length
                ? selectProductShow.images[index]
                : selectProductShow.images
            }
          />

          <div className="detailProduct__img--listImg">
            {selectProductShow.images?.map((img, index) => (
              <Image
                className="detailProduct__img"
                cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                publicId={img}
                onClick={() => setIndex(index)}
              />
            ))}
          </div>
        </div>

        <div className="detailProduct__box">
          <h2>{selectProductShow?.name}</h2>

          <Price
            price={selectProductShow.price}
            price_sale={selectProductShow.price_sale}
          />
          <p>{selectProductShow?.content}</p>
          <button
            className="detailProduct__box--btn"
            onClick={() => dispatch(addCart(selectProductShow))}
          >
            Thêm sản phẩm
          </button>

          <button
            className="detailProduct__box--btn detailProduct__box--btnBuyNow"
            onClick={() => dispatch(addCart(selectProductShow))}
          >
            <NavLink to="/payment">Mua Ngay</NavLink>
          </button>
        </div>
      </div>
      {/* <div className="slider__container">
        <Slider {...Settings}>
          {relatedProductList?.map((product, index) => {
            return <Products product={product} key={index} />;
          })}
        </Slider>
      </div> */}
    </>
  ) : (
    <Loading />
  );
}
