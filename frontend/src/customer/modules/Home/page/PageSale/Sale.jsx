import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCategory } from "~/redux/slice/category/CategorySlice";
import { getSaleProducts } from "~/redux/slice/product/ProductSlice";

// import Products from "../../component/products/Products";
import { Skeleton } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Loading from "../../component/loading/Loading";
import Products from "../../component/products/Products";
import "./../../component/Home.scss";

export default function Sale() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSaleProducts());
    dispatch(getCategory());
  }, [dispatch]);
  const LoadingProduct = useSelector((state) => state.product.isLoading);
  const { saleProductList } = useSelector((state) => state.product);

  return (
    <div>
      <>
        <div className="HomeContainer">
          {LoadingProduct ? (
            <>
              <Skeleton height={400} sx={{ mt: "-70px" }} />

              <div className="product">
                {Array.from(new Array(10)).map((item, index) => {
                  return <Loading index={index} />;
                })}
              </div>
            </>
          ) : (
            <Products productList={saleProductList} />
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
