import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  getACategory,
  resetUpdateCategory,
  updateCategory,
} from "~/redux/slice/category/CategorySlice";
import InputForm from "../../component/InputForm/InputForm";
import Loading from "../../component/Loading/Loading";
import "./SingleCategory.scss";

function SingleCategory() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categorySingle, categoryUpdate, isLoading, isLoadingUpdate } =
    useSelector((state) => state.category);

  const [data, setData] = useState({
    name: "",
    description: "",
    active: "",
  });
  useEffect(() => {
    dispatch(getACategory(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (categorySingle) {
      setData({
        name: categorySingle.name,
        description: categorySingle.description,
        active: categorySingle.active,
      });
    }
  }, [categorySingle]);

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
    dispatch(updateCategory({ ...data, id }));
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
              onChange={(e) => setData({ ...data, name: e.target.value })}
              value={data.name}
              classNameContent="content__input"
            />
            <InputForm
              label="Description"
              type="text"
              name="description"
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              value={data.description}
              className="content__input--des"
              classNameContent="content__input"
            />
            <InputForm
              label="Active"
              type="checkbox"
              name="active"
              onClick={(e) =>
                setData({
                  ...data,
                  active: !e.target.checked === true ? 1 : 0,
                })
              }
              value={data.active}
              checked={data.active === 1 ? true : false}
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
