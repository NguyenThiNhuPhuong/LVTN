import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCategory } from "~/redux/slice/category/CategorySlice";
import { getDiscounts } from "~/redux/slice/discount/DiscountSlice";
import { getAllProducts } from "~/redux/slice/product/ProductSlice";
import { getSlider } from "~/redux/slice/slider/SliderSlice";

import NoProduct from "../../component/noproduct/NoProduct";
// import Products from "../../component/products/Products";
import Pagination from "@mui/material/Pagination";
import "./Home.scss";
import Loading from "../../component/loading/Loading";
const Products = React.lazy(() => import("../../component/products/Products"));
export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getSlider());
    dispatch(getCategory());
    dispatch(getDiscounts());
  }, [dispatch]);
  const listProduct = useSelector((state) => state.product.productList);

  return (
    <div>
      {listProduct?.length === 0 || listProduct?.length === undefined ? (
        <NoProduct />
      ) : (
        <>
          <Suspense fallback={<Loading />}>
            <div className="product">
              {listProduct?.map((product, index) => {
                return <Products product={product} key={index} />;
              })}
            </div>
            <div className="pagination">
              <Pagination
                count={10}
                variant="outlined"
                shape="rounded"
                size="large"
              />
            </div>
          </Suspense>
        </>
      )}
    </div>
  );
}
