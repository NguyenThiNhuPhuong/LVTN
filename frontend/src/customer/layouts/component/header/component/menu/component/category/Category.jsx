import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "./Category.module.scss";
import { getAllProducts, setParams } from "~/redux/slice/product/ProductSlice";

export default function Category() {
  const cx = classNames.bind(styles);
  const dispatch = useDispatch();
  const listCategory = useSelector((state) => state.category.categoryList);
  const { params } = useSelector((state) => state.product);

  const handleSubmitCategory = (e, category_id) => {
    e.preventDefault();
    dispatch(setParams({ ...params, category_id: category_id }));
    dispatch(getAllProducts(...params));
  };
  const handleSubmitAllProduct = (e) => {
    e.preventDefault();

    dispatch(
      setParams({
        page: 1,
        max_price: "",
        min_price: "",
        search: "",
        category_id: "",
      })
    );
    dispatch(getAllProducts(...params));
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapper-item")}>
        <NavLink
          className={cx("menu-item")}
          onClick={(e) => handleSubmitAllProduct(e)}
        >
          <span className={cx("title")}>TẤT CẢ</span>
        </NavLink>
      </div>
      {listCategory?.map((category, index) => {
        return (
          <div key={index} className={cx("wrapper-item")}>
            <NavLink
              className={cx("menu-item")}
              onClick={(e) => handleSubmitCategory(e, category.id)}
            >
              <span className={cx("title")}>{category.name}</span>
            </NavLink>
          </div>
        );
      })}
    </div>
  );
}
