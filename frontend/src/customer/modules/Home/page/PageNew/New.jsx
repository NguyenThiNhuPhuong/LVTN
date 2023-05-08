import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCategory } from "~/redux/slice/category/CategorySlice";
import {
  getNewProducts,
  setNamePage,
  setParams,
} from "~/redux/slice/product/ProductSlice";

import Pagination from "../../component/Pagination/Pagination";
import Loading from "../../component/loading/Loading";
import Products from "../../component/products/Products";
import "./../../component/Home.scss";

export default function New() {
  const dispatch = useDispatch();

  //-------------call data from productSlice------------
  const { isLoading, newProductList, currentPage, totalPages, params } =
    useSelector((state) => state.product);

  //-------------call api ------------------------------
  useEffect(() => {
    dispatch(setNamePage("New"));
    dispatch(getNewProducts(params));
    dispatch(getCategory());
  }, [dispatch, params]);

  //-------------change new page-------------------------
  const handlePageChange = (e, pageNumber) => {
    e.preventDefault();
    dispatch(setParams({ ...params, page: pageNumber }));
  };
  return (
    <div>
      <>
        <div className="HomeContainer">
          {isLoading ? (
            <div className="product">
              {Array.from(new Array(10)).map((item, index) => {
                return <Loading index={index} />;
              })}
            </div>
          ) : (
            <Products productList={newProductList} />
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </>
    </div>
  );
}
