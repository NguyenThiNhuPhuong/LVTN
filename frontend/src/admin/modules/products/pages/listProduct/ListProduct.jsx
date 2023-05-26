import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "~/admin/component/Loading/Loading";
import Top from "~/admin/layouts/component/top/Top";
import { Price } from "~/customer/modules/Home/component/products/component/Price/Price";
import {
  getAllProducts,
  removeProduct,
  resetRemoveProduct,
  setParams,
} from "~/redux/slice/product/ProductSlice";
import "./ListProduct.scss";
import { getCategory } from "~/redux/slice/category/CategorySlice";
import Pagination from "~/admin/layouts/component/Pagination/Pagination";
import CategorySelect from "../../component/CategorySelect/CategorySelect";
import { ToastContainer, toast } from "react-toastify";

function ListProduct() {
  const dispatch = useDispatch();
  //-----------get data from product slice----------------------------
  const {
    productList,
    isLoading,
    alertDeleteSuccess,
    params,
    totalPages,
    currentPage,
  } = useSelector((state) => state.product);
  //------------call api get list product&& remove product success------
  useEffect(() => {
    dispatch(getAllProducts(params));
    dispatch(
      getCategory({
        page: "",
        per_page: "",
        active: "",
      })
    );
  }, [dispatch, params]);
  useEffect(() => {
    if (
      alertDeleteSuccess ===
      "The order contains products that cannot be deleted!"
    ) {
      toast.info("Đơn hàng có chứa sản phẩm nên k thể xóa", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (alertDeleteSuccess === "Delete products successful! ") {
      toast.success("Bạn đã xóa thành công sản phẩm", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    setTimeout(() => dispatch(resetRemoveProduct()), 2000);
  }, [alertDeleteSuccess, dispatch]);

  //-------handel remove product---------------------------------------
  const handelRemoveProduct = async (id) => {
    const result = await Swal.fire({
      title: `Bạn có chắc chắn muốn xóa product ${id}?`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
      customClass: {
        actions: "my-actions",
        cancelButton: "order-1 right-gap",
        confirmButton: "order-2",
      },
    });
    if (result.isConfirmed) {
      dispatch(removeProduct(id));
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  };
  //-----------------change Page---------------------------------------
  const handlePageChange = (e, pageNumber) => {
    e.preventDefault();
    dispatch(setParams({ ...params, page: pageNumber }));
  };

  const Product = () => {
    return (
      <>
        <ToastContainer />
        <div className="ListProductContainer">
          <Top title="Products" to="/admin/product/newProduct" />
          <div className="main">
            <div className="header">
              <CategorySelect />
            </div>
            <hr />
            {productList?.length > 0 ? (
              <div className="content">
                {productList.map((product, index) => {
                  return (
                    <div className="item" key={index}>
                      <div className="item__img">
                        <img src={product.images[0]} alt="" />
                      </div>

                      <span className="item__title">{product.name}</span>
                      <span className="item__price">
                        <Price
                          price={product.price}
                          price_sale={product.price_sale}
                        />
                      </span>
                      <div className="item__adjust">
                        <button className="item__adjust--update">
                          <NavLink to={`/admin/product/${product.id}`}>
                            <CreateIcon />
                          </NavLink>
                        </button>
                        <button
                          className="item__adjust--delete"
                          onClick={() => handelRemoveProduct(product.id)}
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="noProductList">Hiện tại k có sản phẩm nào 😓</div>
            )}
          </div>
          {totalPages > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </>
    );
  };

  return isLoading ? <Loading /> : <Product />;
}

export default ListProduct;
