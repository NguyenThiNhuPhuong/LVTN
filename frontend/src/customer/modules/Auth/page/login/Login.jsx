import classNames from "classnames/bind";
import styles from "../../component/Auth.module.scss";

import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { MENU_LOGIN } from "~/components/constant/Menu";

import { setOpenModal, signInUser } from "~/redux/slice/auth/AuthSlice";
import FormRegister from "../../component/FormRegister/FormRegister";

const cx = classNames.bind(styles);

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { role, isOpenModal } = useSelector((state) => state.auth);
  const password = `^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,20}$`;

  //-----authorization---------
  useEffect(() => {
    if (role === 1) {
      navigate("/admin/dashboard");
    } else if (role === 2) {
      navigate("/product/shop");
    } else if (role === 3) {
      navigate("/shipper/dashboard");
    } else {
      navigate("/login");
    }
  }, [navigate, role]);
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });
  //----open modal------
  const Modal = () => {
    const handleSubmit = (values) => {
      // Xử lý submit form tại đây
      console.log(values);
    };

    return (
      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form id="myModal" className={cx("modal")}>
          <div className={cx("modal-content")}>
            <div className={cx("modal-content__top")}>
              <h3>Quên Mật khẩu</h3>
              <span onClick={() => dispatch(setOpenModal(false))}>
                <div className={cx("close")}>&times;</div>
              </span>
            </div>
            <div className={cx("modal-content__center")}>
              <label htmlFor="inputField">Nhập Email </label>
              <Field
                type="text"
                id="inputField"
                name="email"
                className={cx("input")}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={cx("error-message")}
              />
            </div>
            <div className={cx("modal-content__btn")}>
              <button id="submitBtn" type="submit">
                Submit
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    );
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      dispatch(signInUser(values));
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Vui lòng nhập định dạng email hợp lệ")
        .required("Vui lòng điền vào trường này"),
      password: Yup.string()
        .matches(password, "Password is not valid")
        .required("Vui lòng điền vào trường này"),
    }),
  });

  return (
    <div className={cx("formRegisterContainer")}>
      {isOpenModal && <Modal />}
      <form className={cx("formRegister")} onSubmit={formik.handleSubmit}>
        <h3 className={cx("formRegister__heading")}>ĐĂNG NHẬP </h3>
        {MENU_LOGIN.map((input, index) => {
          return (
            <FormRegister
              key={index}
              {...input}
              onChange={formik.handleChange}
              value={formik.values[input.name]}
              errors={formik.errors[input.name]}
              touched={formik.touched[input.name]}
            />
          );
        })}
        <div className={cx("formRegister__bottom")}>
          <div className={cx("formRegister__bottom--forgetPassword")}>
            <div className={cx("radio")}>
              <input
                type="checkbox"
                id=" Remember Me"
                name=" Remember Me"
                required={isOpenModal ? false : true}
              />
              <label htmlFor=" Remember Me"> Remember Me</label>
            </div>
            <button type="button" onClick={() => dispatch(setOpenModal(true))}>
              Quên mật khẩu
            </button>
          </div>
          <button type="submit" className={cx("formRegister__bottom--btn")}>
            Đăng Nhập
          </button>
          <div className={cx("formRegister__bottom--newAccount")}>
            <label> Tạo tài khoản mới ? </label>
            <NavLink
              to="/register"
              className={cx("formRegister__bottom--title")}
            >
              Đăng ký
            </NavLink>
          </div>
        </div>
      </form>
    </div>
  );
}
