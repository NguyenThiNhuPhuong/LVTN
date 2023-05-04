import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCategory } from "~/redux/slice/category/CategorySlice";
import {
  getDiscounts,
  getListDiscountByDate,
} from "~/redux/slice/discount/DiscountSlice";
import { getAllProducts } from "~/redux/slice/product/ProductSlice";
import { getListSlider } from "~/redux/slice/slider/SliderSlice";

// import Products from "../../component/products/Products";
import { Skeleton } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Loading from "../../component/loading/Loading";
import Products from "../../component/products/Products";
import "./../../component/Home.scss";
export default function Home() {
  const dispatch = useDispatch();
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const date = String(currentDate.getDate()).padStart(2, "0");
  console.log(`${year}/${month}/${date}`);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getListSlider());
    dispatch(getCategory());
    dispatch(getListDiscountByDate(`${year}/${month}/${date}`));
  }, [date, dispatch, month, year]);
  const LoadingProduct = useSelector((state) => state.product.isLoading);
  const LoadingSlider = useSelector((state) => state.slider.isLoading);
  const { productList } = useSelector((state) => state.product);

  return (
    <div>
      <>
        <div className="HomeContainer">
          {LoadingProduct && LoadingSlider ? (
            <>
              <Skeleton height={400} sx={{ mt: "-70px" }} />

              <div className="product">
                {Array.from(new Array(10)).map((item, index) => {
                  return <Loading index={index} />;
                })}
              </div>
            </>
          ) : (
            <Products productList={productList} />
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
    </div>
  );
}
