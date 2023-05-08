import { useDispatch, useSelector } from "react-redux";
import { setParams } from "~/redux/slice/product/ProductSlice";
import "./CategorySelect.scss";
function CategorySelect() {
  const dispatch = useDispatch();
  const listCategory = useSelector((state) => state.category.categoryList);
  const { params } = useSelector((state) => state.product);
  const handleSubmitCategory = (e) => {
    e.preventDefault();
    dispatch(setParams({ ...params, category_id: e.target.value }));
  };

  return (
    <div className="sort">
      <select
        name=""
        onChange={handleSubmitCategory}
        value={params.category_id}
        className="menu-item"
      >
        <option value="">
          <span className="title">TẤT CẢ</span>
        </option>
        {listCategory?.map((category, index) => {
          return (
            <option value={category.id}>
              <span className="title">{category.name}</span>
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default CategorySelect;
