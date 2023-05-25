import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Loading from "~/admin/component/Loading/Loading";
import {
  getADiscount,
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
  console.log(JSON.stringify(discountUpdate) !== "{}");
  //   useEffect(() => {
  //     if (JSON.stringify(discountUpdate) !== "{}") {
  //       toast.success(`Cập nhật Discount  thành công`, {
  //         position: toast.POSITION.TOP_RIGHT,
  //       });
  //       setTimeout(() => {
  //
  //         navigate("/admin/discount");
  //       }, 3000);
  //     }
  //   }, [navigate, dispatch, discountUpdate]);

  //----------handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateDiscount({ ...discountSingle, id }));
  };
  //-----------handle change
  const handleChange = (e, name) => {
    e.preventDefault();
    console.log(e.target.value, name);
    // dispatch(
    //   setUpdateDiscount({
    //     ...discountSingle,
    //     [name]: e.target.value,
    //   })
    // );
  };

  const Discount = () => {
    return (
      <form onSubmit={handleSubmit}>
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
                      //   value={discountSingle[field.name]}
                      required
                    />
                    <label>{field.label}</label>
                  </div>
                );
              })}
              <div className="content__input">
                <input
                  type="text"
                  name="code"
                  onChange={(e) => handleChange(e, "code")}
                  value={discountSingle.code}
                />
                <label>Code</label>
              </div>
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
