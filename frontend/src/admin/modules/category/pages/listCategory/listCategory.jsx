import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Top from "~/admin/layouts/component/top/Top";
import { getCategory } from "~/redux/slice/category/CategorySlice";
import CategoryItem from "../../component/CategoryItem/CategoryItem";
import Loading from "../../component/Loading/Loading";
import "./listCategory.scss";

const ListCategory = () => {
  const { isLoading } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const Category = () => {
    return (
      <div className="ListCategoryContainer">
        <Top title="Danh sách người dùng" to="newCategory" />
        <div className="category">
          <div className="category__row category__header-labels">
            <div className="text-center">ID</div>
            <div className="text-center">Name</div>
            <div className="text-center">Description</div>
            <div className="text-center">Ngày tạo</div>
            <div className="text-center">Ngày Chỉnh sửa</div>
            <div className="text-center">Action</div>
            <div className="text-center">Active</div>
          </div>
          <CategoryItem />
        </div>
      </div>
    );
  };

  return isLoading ? <Loading /> : <Category />;
};

export default ListCategory;
