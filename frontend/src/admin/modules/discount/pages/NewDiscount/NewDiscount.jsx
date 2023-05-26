import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import {
  newDiscount,
  resetNewDiscount,
} from "~/redux/slice/discount/DiscountSlice";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import "./NewDiscount.scss";

function NewDiscount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { discountNew } = useSelector((state) => state.discount);

  useEffect(() => {
    if (JSON.stringify(discountNew) !== "{}") {
      toast.success("Bạn đã thêm discount thành công", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        navigate("/admin/discount");
        dispatch(resetNewDiscount());
      }, 3000);
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
      dispatch(newDiscount(values));
    },
    validationSchema: Yup.object({
      code: Yup.string().required("Vui lòng điền vào trường này"),
      description: Yup.string().required("Vui lòng điền vào trường này"),
      discount: Yup.number()
        .typeError("Vui lòng nhập chữ số")
        .min(1, "Số phải lớn hơn 0")
        .required("Vui lòng điền vào trường này"),
      purchase_limit: Yup.number("Vui lòng nhập chữ số")
        .min(1, "Số phải lớn hơn 0")
        .required("Vui lòng điền vào trường này"),
      expiration_date: Yup.string()
        .matches(
          /^(19|20)\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/,
          "Vui lòng nhập ngày theo định dạng yyyy/mm/dd"
        )
        .required("Vui lòng điền vào trường này"),
      minium_order: Yup.number()
        .typeError("Vui lòng nhập chữ số")
        .min(0, "Số phải lớn hơn hoặc bằng 0")
        .required("Vui lòng điền vào trường này"),
    }),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="DiscountContainer">
        <div className="DiscountContainer__top">
          <ToastContainer />
          <NavLink to="/admin/Discount">
            <CloseIcon />
          </NavLink>
        </div>
        <div className="DiscountContainer__container">
          <div className="header">
            <h3>New Discount</h3>
          </div>
          <div className="content">
            {Object.keys(formik.values).map((key) => (
              <div className="content__input" key={key}>
                <input
                  type="text"
                  name={key}
                  onChange={formik.handleChange}
                  value={formik.values[key]}
                />
                <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                {formik.errors[key] && formik.touched[key] && (
                  <p>{formik.errors[key]}</p>
                )}
              </div>
            ))}
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
