import { SearchOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";
import styles from "./SearchProduct.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, setParams } from "~/redux/slice/product/ProductSlice";
const cx = classNames.bind(styles);

function Search(props) {
  const dispatch = useDispatch();
  const { params } = useSelector((state) => state.product);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getAllProducts(params));
    dispatch(setParams({ ...params, search: "" }));
  };
  return (
    <div className={cx("search")}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={cx("search__box")}>
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            onChange={(e) =>
              dispatch(setParams({ ...params, search: e.target.value }))
            }
            value={params.search}
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
