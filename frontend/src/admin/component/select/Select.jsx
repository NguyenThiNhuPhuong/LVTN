import React from "react";
import "./Select.scss";
function Select({ setCategory_id }) {
  return (
    <div className="formCategory">
      <select
        required
        onChange={(e) => {
          setCategory_id(e.target.value);
        }}
      >
        <option value="">Chọn danh mục sản phẩm</option>
        {/* {listCategory.map((category) => (
                    <option value={category._id}>{category.name}</option>
                  ))} */}
      </select>
    </div>
  );
}

export default Select;
