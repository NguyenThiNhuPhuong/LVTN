import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setParams } from "~/redux/slice/product/ProductSlice";
import styles from "./Category.module.scss";

export default function Category() {
  const cx = classNames.bind(styles);
  const dispatch = useDispatch();
  const listCategory = useSelector((state) => state.category.categoryList);
  const { params } = useSelector((state) => state.product);

  const handleSubmitCategory = (e, category_id) => {
    e.preventDefault();
    dispatch(setParams({ ...params, category_id: category_id }));
  };
  const handleSubmitAllProduct = (e) => {
    e.preventDefault();
    dispatch(setParams({ ...params, category_id: "" }));
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
            <button onClick={(e) => handleSubmitCategory(e, category.id)}>
              <NavLink className={cx("menu-item")} to="/product/shop">
                <span className={cx("title")}>{category.name}</span>
              </NavLink>
            </button>
          </div>
        );
      })}
    </div>
  );
}
