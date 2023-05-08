import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import "./Search.scss";
import {
  resetResultSearch,
  setParams,
  setResultSearch,
} from "~/redux/slice/product/ProductSlice";

function Search() {
  const dispatch = useDispatch();
  const { params, resultSearch } = useSelector((state) => state.product);
  //------------handel search product by name-------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setParams({ ...params, search: resultSearch }));
    dispatch(resetResultSearch());
  };
  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        className="search__input"
        placeholder="Search....."
        onChange={(e) => dispatch(setResultSearch(e.target.value))}
        value={resultSearch}
      />
      <button type="submit">
        <SearchOutlined />
      </button>
    </form>
  );
}

export default Search;
