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
  }, [dispatch, id]);
  useEffect(() => {
    if (JSON.stringify(discountUpdate) !== "{}") {
      toast.success(`Cập nhật Discount ${id} thành công`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        resetUpdateDiscount();
        navigate("/admin/discount");
      }, 3000);
    }
  }, [navigate, dispatch, discountUpdate, id]);

  //----------handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateDiscount({ ...discountSingle, id }));
  };
  //-----------handle change
  const handleChange = (e, name) => {
    console.log(e.target.value, name);
    dispatch(
      setUpdateDiscount({
        ...discountSingle,
        [name]: e.target.value,
      })
    );
  };

  const Discount = () => {
    return (
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="DiscountContainer">
          <ToastContainer />
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
                      onChange={(e) => handleChange(e, field.name)}
                      value={discountSingle ? discountSingle[field.name] : ""}
                    />
                    <label>{field.label}</label>
                  </div>
                );
              })}
              <input
                type="text"
                //   name={field.name}
                onChange={(e) => console.log(e.target.value)}
                //   value={discountSingle ? discountSingle[field.name] : ""}
              />
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
