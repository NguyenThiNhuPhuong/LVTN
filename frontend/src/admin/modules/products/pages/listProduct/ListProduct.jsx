import { useDispatch, useSelector } from "react-redux";
import "./ListProduct.scss";
import { Image } from "cloudinary-react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";
import { getAllProducts } from "~/redux/slice/product/ProductSlice";
import { Price } from "~/customer/modules/Home/component/products/component/Price/Price";
import Top from "~/admin/layouts/component/top/Top";
function ListProduct() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const listProduct = useSelector((state) => state.product.productList);
  return (
    <div className="ListProductContainer">
      <Top title="Products" to="/admin/product/newProduct" />
      <div className="main">
        <div className="header">
          <div className="search">
            <input className="search__input" placeholder="Search....." />
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
        <div className="content">
          {listProduct?.map((product, index) => {
            return (
              <div className="item" key={index}>
                <Image
                  className="item__img"
                  cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
                  publicId={product.images[1]}
                />
                <span className="item__title">{product.name}</span>
                <span className="item__price">
                  <Price
                    price={product.price}
                    price_sale={product.price_sale}
                  />
                </span>
                <div className="item__adjust">
                  <button className="item__adjust--update">
                    <CreateIcon />
                  </button>
                  <button className="item__adjust--delete">
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ListProduct;
