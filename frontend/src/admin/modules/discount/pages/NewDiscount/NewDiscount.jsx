import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import "./NewDiscount.scss";
import {
  newDiscount,
  resetNewDiscount,
} from "~/redux/slice/discount/DiscountSlice";

function NewDiscount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { discountNew } = useSelector((state) => state.discount);

  useEffect(() => {
    if (JSON.stringify(discountNew) !== "{}") {
      Swal.fire({
        title: `Bạn đã thêm  thành công Discount  !`,
        width: 600,
        padding: "5em 3em",
        color: "#716add",
        background:
          "#fff url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQjEMu40wWChZR02Px-9nGcm_YYCrMoT_-723jlpkdTq3p_Y-FZbpDwT25HRiCOzqeCH0&usqp=CAU)",
        backdrop: `
                  rgba(0,0,123,0.4)
                  url("https://sweetalert2.github.io/images/nyan-cat.gif")
                  left top
                  no-repeat
                `,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Saved!", "", "success");
          dispatch(resetNewDiscount());
          navigate("/admin/discount");
        }
      });
    }
  }, [navigate, discountNew, dispatch]);

  const formik = useFormik({
    initialValues: {
      code: "",
      description: "",
      discount: "",
      purchase_limit: "",
      expiration_date: "",
      minium_order: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      dispatch(newDiscount(values));
    },
    validationSchema: Yup.object({
      code: Yup.string().required("Vui lòng điền vào trường này"),
      description: Yup.string().required("Vui lòng điền vào trường này"),
      discount: Yup.string().required("Vui lòng điền vào trường này"),
      purchase_limit: Yup.string().required("Vui lòng điền vào trường này"),
      expiration_date: Yup.string().required("Vui lòng điền vào trường này"),
      minium_order: Yup.string().required("Vui lòng điền vào trường này"),
    }),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="DiscountContainer">
        <div className="DiscountContainer__top">
          <NavLink to="/admin/Discount">
            <CloseIcon />
          </NavLink>
        </div>
        <div className="DiscountContainer__container">
          <div className="content">
            <div className="content__input">
              <input
                type="text"
                name="code"
                onChange={formik.handleChange}
                value={formik.values.code}
              />
              <label>Code</label>
              {formik.errors.code && formik.touched.code && (
                <p>{formik.errors.code}</p>
              )}
            </div>
            <div className="content__input">
              <input
                type="text"
                name="discount"
                onChange={formik.handleChange}
                value={formik.values.discount}
              />
              <label>Discount</label>
              {formik.errors.discount && formik.touched.discount && (
                <p>{formik.errors.discount}</p>
              )}
            </div>
            <div className="content__input">
              <input
                type="text"
                name="purchase_limit"
                onChange={formik.handleChange}
                value={formik.values.purchase_limit}
              />
              <label>Số lượng</label>
              {formik.errors.purchase_limit &&
                formik.touched.purchase_limit && (
                  <p>{formik.errors.purchase_limit}</p>
                )}
            </div>
            <div className="content__input">
              <input
                type="text"
                name="expiration_date"
                onChange={formik.handleChange}
                value={formik.values.expiration_date}
              />
              <label>Ngày hết hạn</label>
              {formik.errors.expiration_date &&
                formik.touched.expiration_date && (
                  <p>{formik.errors.expiration_date}</p>
                )}
            </div>
            <div className="content__input">
              <input
                type="text"
                name="minium_order"
                onChange={formik.handleChange}
                value={formik.values.minium_order}
              />
              <label>Hóa đơn tối thiểu</label>
              {formik.errors.minium_order && formik.touched.minium_order && (
                <p>{formik.errors.minium_order}</p>
              )}
            </div>
            <div className="content__input">
              <input
                type="text"
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
                className="content__input--des"
              />
              <label>Description</label>
              {formik.errors.description && formik.touched.description && (
                <p>{formik.errors.description}</p>
              )}
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
}

export default NewDiscount;
