import { useDispatch, useSelector } from "react-redux";
import "./ListProduct.scss";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import {
  getAllProducts,
  removeProduct,
  resetRemoveProduct,
  setSearchResults,
} from "~/redux/slice/product/ProductSlice";
import { Price } from "~/customer/modules/Home/component/products/component/Price/Price";
import Top from "~/admin/layouts/component/top/Top";
import Loading from "~/admin/component/Loading/Loading";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";

function ListProduct() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  const { productList, searchResults, isLoading, alertDeleteSuccess } =
    useSelector((state) => state.product);
  useEffect(() => {
    if (alertDeleteSuccess !== "") {
      Swal.fire("Saved!", "", "success");

      dispatch(getAllProducts());
      return () => {
        dispatch(resetRemoveProduct());
      };
    }
  }, [dispatch, alertDeleteSuccess]);
  const handleInputChange = (e) => {
    const query = e.target.value;
    setQuery(query);

    const filteredProducts = productList.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    dispatch(setSearchResults(filteredProducts));
  };

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
  console.log(productList);

  const Product = () => {
    return (
      <div className="ListProductContainer">
        <Top title="Products" to="/admin/product/newProduct" />
        <div className="main">
          <div className="header">
            <div className="search">
              <input
                className="search__input"
                placeholder="Search....."
                value={query}
                onChange={handleInputChange}
              />
            </div>
            <div className="sort">
              <select className="sort sort-category">
                <option value="">All category</option>
              </select>
              <select className="sort sort-timeLast">
                <option value="">Latest added</option>
              </select>
            </div>
          </div>
          <hr />
          {productList?.length > 0 ? (
            <div className="content">
              {(query ? searchResults : productList).map((product, index) => {
                return (
                  <div className="item" key={index}>
                    <img src={product.images[0]} alt="" className="item__img" />

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
      </div>
    );
  };

  return isLoading ? <Loading /> : <Product />;
}

export default ListProduct;
