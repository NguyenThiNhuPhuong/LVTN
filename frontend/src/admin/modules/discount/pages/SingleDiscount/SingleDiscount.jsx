import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loading from "~/admin/component/Loading/Loading";
import {
  getADiscount,
  resetUpdateDiscount,
  setUpdateDiscount,
  updateDiscount,
} from "~/redux/slice/discount/DiscountSlice";
import { inputFields } from "../../component/MenuDiscount";
import "./SingleDiscount.scss";

function SingleDiscount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { discountSingle, isLoading, discountUpdate } = useSelector(
    (state) => state.discount
  );
  useEffect(() => {
    dispatch(getADiscount(id));

    if (discountUpdate !== undefined) {
      toast.success(`Cập nhật Category ${id} thành công`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(resetUpdateDiscount());
      setTimeout(() => navigate("/admin/discount"), 5000);
    }
  }, [navigate, id, dispatch, discountUpdate]);

  useEffect(() => {
    dispatch(getADiscount(id));
  }, [id, dispatch]);
  //----------handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateDiscount({ ...discountSingle, id }));
  };
  //-----------handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setUpdateDiscount({
        ...discountSingle,
        [name]: value,
      })
    );
  };
  const Discount = () => {
    return (
      <form onSubmit={(e) => handleSubmit(e)}>
        <ToastContainer />
        <div className="DiscountContainer">
          <div className="DiscountContainer__top">
            <NavLink to="/admin/Discount">
              <CloseIcon />
            </NavLink>
          </div>
          <div className="DiscountContainer__container">
            <div className="content">
              {inputFields.map((field) => {
                return (
                  <div className="content__input" key={field.name}>
                    <input
                      type={field.type}
                      name={field.name}
                      id={field.name}
                      onChange={handleChange}
                      value={discountSingle[field.name]}
                    />
                    <label>{field.label}</label>
                  </div>
                );
              })}
            </div>
            <div className="bottom">
              <button type="submit" className="bottom--btn btn-save">
                save change
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  };

  return isLoading ? <Loading /> : <Discount />;
}

export default SingleDiscount;
