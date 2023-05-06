import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCategory } from "~/redux/slice/category/CategorySlice";
import { getListDiscountByDate } from "~/redux/slice/discount/DiscountSlice";
import { getAllProducts, setNewPage } from "~/redux/slice/product/ProductSlice";
import { getListSlider } from "~/redux/slice/slider/SliderSlice";

// import Products from "../../component/products/Products";
import Pagination from "../../component/Pagination/Pagination";
import Loading from "../../component/loading/Loading";
import Products from "../../component/products/Products";
import "./../../component/Home.scss";
export default function Home() {
  const dispatch = useDispatch();
  //   ------------get the current date----------
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const date = String(currentDate.getDate()).padStart(2, "0");
  // -------------get data from slice-------------
  const LoadingProduct = useSelector((state) => state.product.isLoading);
  const { productList, currentPage, totalPages } = useSelector(
    (state) => state.product
  );

  //------------------call api---------------------------------
  useEffect(() => {
    dispatch(getAllProducts(currentPage));
    dispatch(getListSlider());
    dispatch(getCategory());
    dispatch(getListDiscountByDate(`${year}/${month}/${date}`));
  }, [currentPage, date, dispatch, month, year]);
  //------------handling when changing page number------------
  const handlePageChange = (pageNumber) => {
    dispatch(setNewPage(pageNumber));
  };
  return (
    <div>
      <>
        <div className="HomeContainer">
          {LoadingProduct ? (
            <div className="product">
              {Array.from(new Array(10)).map((item, index) => {
                return <Loading index={index} />;
              })}
            </div>
          ) : (
            <Products productList={productList} />
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
