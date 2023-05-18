import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loading from "~/admin/component/Loading/Loading";
import {
  getACategory,
  resetUpdateCategory,
  setSingleCategory,
  updateCategory,
} from "~/redux/slice/category/CategorySlice";
import InputForm from "../../component/InputForm/InputForm";
import "./SingleCategory.scss";

function SingleCategory() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getACategory(id));
  }, [dispatch, id]);
  const { categorySingle, categoryUpdate, isLoading, isLoadingUpdate } =
    useSelector((state) => state.category);

  useEffect(() => {
    if (isLoadingUpdate === false && JSON.stringify(categoryUpdate) !== "{}") {
      toast.success(`Cập nhật Category ${id} thành công`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(resetUpdateCategory());
      setTimeout(() => navigate("/admin/category"), 5000);
    }
  }, [categoryUpdate, navigate, isLoadingUpdate, id, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCategory({ ...categorySingle, id }));
  };

  return isLoading ? (
    <Loading />
  ) : (
    <form onSubmit={handleSubmit}>
      <ToastContainer />
      <div className="CategoryContainer">
        <div className="CategoryContainer__top">
          <NavLink to="/admin/category">Category / </NavLink>
          <span>Category {id}</span>
        </div>
        <div className="CategoryContainer__container">
          <div className="content">
            <InputForm
              label="Name"
              name="name"
              type="text"
              onChange={(e) =>
                dispatch(
                  setSingleCategory({ ...categorySingle, name: e.target.value })
                )
              }
              value={categorySingle.name}
              classNameContent="content__input"
            />
            <InputForm
              label="Description"
              type="text"
              name="description"
              onChange={(e) =>
                dispatch(
                  setSingleCategory({
                    ...categorySingle,
                    description: e.target.value,
                  })
                )
              }
              value={categorySingle.description}
              className="content__input--des"
              classNameContent="content__input"
            />
            <InputForm
              label="Active"
              type="checkbox"
              name="active"
              onClick={(e) =>
                dispatch(
                  setSingleCategory({
                    ...categorySingle,
                    active: e.target.checked ? 1 : 0,
                  })
                )
              }
              value={categorySingle.active}
              checked={categorySingle.active === 1 ? true : false}
              className="content__input--checkbox"
              classNameContent="content__checkbox"
            />
          </div>
          <div className="bottom">
            <button type="submit" className="bottom--btn btn-save">
              save change
            </button>
            <input type="reset" value="Reset" className="bottom--btn " />
          </div>
        </div>
      </div>
    </form>
  );
}

export default SingleCategory;
