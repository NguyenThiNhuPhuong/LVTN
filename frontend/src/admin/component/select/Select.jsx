import React from "react";
import "./Select.scss";
import { useSelector } from "react-redux";
function Select({ onChange }) {
  const { categoryList } = useSelector((state) => state.category);
  return (
    <div className="formCategory">
      <select required onChange={onChange}>
        <option value="">Chọn danh mục sản phẩm</option>
        {categoryList?.map((category) => {
          return (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Select;
