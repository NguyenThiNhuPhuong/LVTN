import React, { useEffect } from "react";
import "./NewUser.scss";
import { NavLink, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { newUser, resetNewUser } from "~/redux/slice/user/UserSlice";

function NewUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userNew } = useSelector((state) => state.user);

  useEffect(
    () =>
      userNew !== ""
        ? dispatch(resetNewUser()) && navigate("/admin/category")
        : "",
    [dispatch, navigate, userNew]
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      type: 2,
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      dispatch(newUser(values));
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng điền vào trường này"),
      email: Yup.string().required("Vui lòng điền vào trường này"),
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
        <div className="ProfileContainer__top">
          <NavLink to="/admin/user">
            <CloseIcon />
          </NavLink>
        </div>
        <div className="ProfileContainer__container">
          <div className="header">
            <div className="header__img">
              <img
                alt="avatar"
                src="https://demos.themeselection.com/materio-mui-react-nextjs-admin-template-free/images/avatars/1.png"
              ></img>
            </div>
            <div className="header__content">
              <div className="header__content-top">
                <div className="header__content--btn btn-update">
                  <span>UPLOAD NEW PHOTO</span>
                </div>
                <div className="header__content--btn btn-reset">
                  <span>RESET</span>
                </div>
              </div>
              <div className="header__content-bottom">
                <span>Allowed PNG or JPEG. Max size of 800K.</span>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="content__input">
              <input
                type="text"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              <label>Họ và tên</label>
              {formik.errors.name && formik.touched.name && (
                <p>{formik.errors.name}</p>
              )}
            </div>
            <div className="content__input">
              <input
                type="text"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <label>Email</label>
              {formik.errors.email && formik.touched.email && (
                <p>{formik.errors.email}</p>
              )}
            </div>
            <div className="content__input">
              <input
                type="text"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <label>Mật khẩu</label>
              {formik.errors.password && formik.touched.password && (
                <p>{formik.errors.password}</p>
              )}
            </div>
            <div className="content__input">
              <input
                type="text"
                name="confirmPassword"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
              />
              <label>Nhập lại mật khẩu</label>
              {formik.errors.confirmPassword &&
                formik.touched.confirmPassword && (
                  <p>{formik.errors.confirmPassword}</p>
                )}
            </div>
            <div className="sidebar__container">
              <input
                type="radio"
                id="admin"
                name="type"
                value={1}
                checked={formik.values.type === 1}
                onChange={formik.handleChange}
              />
              <label htmlFor="admin">Admin</label>
              <input
                type="radio"
                id="user"
                name="type"
                value={2}
                checked={formik.values.type === 2}
                onChange={formik.handleChange}
              />
              <label htmlFor="user">Khách hàng</label>
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
