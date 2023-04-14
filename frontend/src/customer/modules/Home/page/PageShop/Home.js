import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCategory } from "~/redux/slice/category/CategorySlice";
import { getDiscounts } from "~/redux/slice/discount/DiscountSlice";
import { getAllProducts } from "~/redux/slice/product/ProductSlice";
import { getSlider } from "~/redux/slice/slider/SliderSlice";

import NoProduct from "../../component/noproduct/NoProduct";
// import Products from "../../component/products/Products";
import Pagination from "@mui/material/Pagination";
import Products from "../../component/products/Products";
import "./Home.scss";
export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getSlider());
    dispatch(getCategory());
    dispatch(getDiscounts());
  }, [dispatch]);
  const listProduct = useSelector((state) => state.product.productList);
  const loading = false;
  return (
    <div>
      {listProduct?.length === 0 || listProduct?.length === undefined ? (
        <NoProduct />
      ) : (
        <>
          <div className="product">
            {(loading ? Array.from(new Array(10)) : listProduct).map(
              (product, index) => {
                return <Products product={product} key={index} />;
              }
            )}
          </div>
          <div className="pagination">
            <Pagination
              count={10}
              variant="outlined"
              shape="rounded"
              size="large"
            />
          </div>
        </>
      )}
    </div>
  );
}
