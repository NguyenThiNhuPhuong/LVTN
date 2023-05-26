import React, { useEffect } from "react";
import "./NewUser.scss";
import { NavLink, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { newUser, resetNewUser } from "~/redux/slice/user/UserSlice";
import { ToastContainer, toast } from "react-toastify";
import { MenuSelect, MenuUser } from "../../component/Menu";
import InputUser from "../../component/InputUser/InputUser";

function NewUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userNew } = useSelector((state) => state.user);
  console.log(Object.keys(userNew).length !== 0);
  useEffect(() => {
    if (Object.keys(userNew).length !== 0) {
      toast.success("Bạn đã tạo mới thành công", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        dispatch(resetNewUser());
        navigate("/admin/user");
      }, 5000);
    }
  }, [dispatch, navigate, userNew]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      type: 2,
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      dispatch(newUser(values));
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng điền vào trường này"),
      email: Yup.string().email().required("Vui lòng điền vào trường này"),
      type: Yup.string().required("Vui lòng điền vào trường này"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="ProfileContainer">
        <ToastContainer />

        <div className="ProfileContainer__top">
          <NavLink to="/admin/user">
            <CloseIcon />
          </NavLink>
        </div>
        <div className="ProfileContainer__container">
          <div className="header">
            <h2>New User</h2>
          </div>
          <div className="content">
            {MenuUser.map((item) => {
              return (
                <InputUser
                  name={item.name}
                  id={item.name}
                  value={formik.values[item.name]}
                  onChange={formik.handleChange}
                  label={item.label}
                  error={formik.touched[item.name] && formik.errors[item.name]}
                />
              );
            })}

            <div className="sidebar__container">
              {MenuSelect.map((item) => {
                return (
                  <div key={item.value}>
                    <input
                      type="radio"
                      id={item.label}
                      name="type"
                      value={item.value}
                      checked={formik.values.type == item.value}
                      onChange={formik.handleChange}
                    />
                    <label htmlFor={item.label}>{item.label}</label>
                    {formik.errors.type && formik.touched.type && (
                      <p>{formik.errors.type}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bottom">
            <button type="submit" className="bottom--btn btn-save">
              save change
            </button>
            <button type="reset" className="bottom--btn btn-reset">
              reset
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default NewUser;
