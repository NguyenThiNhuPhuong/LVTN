import { SearchOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import {
  resetResultSearch,
  setParams,
  setResultSearch,
} from "~/redux/slice/product/ProductSlice";
import styles from "./SearchProduct.module.scss";
const cx = classNames.bind(styles);

function Search() {
  const dispatch = useDispatch();
  const { params, resultSearch } = useSelector((state) => state.product);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setParams({ ...params, search: resultSearch }));
    dispatch(resetResultSearch());
  };
  return (
    <div className={cx("search")}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={cx("search__box")}>
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            onChange={(e) => dispatch(setResultSearch(e.target.value))}
            value={resultSearch}
          />
          <button type="submit">
            <SearchOutlined />
          </button>
        </div>
      </form>
    </div>
  );
}

Search.propTypes = {};

export default Search;
