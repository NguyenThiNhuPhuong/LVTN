import { useSelector } from "react-redux";
import "./Select.scss";
function Select({ onChange, value }) {
  const { categoryList } = useSelector((state) => state.category);

  return (
    <div className="formCategory">
      <select required onChange={onChange}>
        <option value={value ? value : ""}>
          {value ? value : `Chọn danh mục sản phẩm`}
        </option>
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
