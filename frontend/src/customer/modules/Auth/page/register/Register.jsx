import classNames from "classnames/bind";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { MENU_REGISTER } from "~/components/constant/Menu";
import { resetRegister, signUpUser } from "~/redux/slice/auth/AuthSlice";
import styles from "../../component/Auth.module.scss";
import FormRegister from "../../component/FormRegister/FormRegister";
import { useEffect } from "react";
const cx = classNames.bind(styles);

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const success = useSelector((state) => state.auth.isSusses);

  useEffect(() => {
    // redirect user to login page if registration was successful
    if (success === true)
      toast.success("User successfully registered", {
        position: toast.POSITION.BOTTOM_RIGHT,
        data: {
          title: "Success toast",
          text: "This is a success message",
        },
      });
    setTimeout(() => navigate("/login"), 3000);
    // redirect authenticated user to profile screen
  }, [navigate, success]);
  const password = `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,20}$`;
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      dispatch(signUpUser(values));
      dispatch(resetRegister());

      // actions.resetForm();
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Qua Ngan!")
        .max(50, "Qua dai roi b oi!")
        .required("Vui lòng điền vào trường này"),
      email: Yup.string()
        .email("Vui lòng nhập định dạng email hợp lệ")
        .required("Vui lòng điền vào trường này"),

      password: Yup.string()
        .matches(password, "Password is not valid")
        .required("Vui lòng điền vào trường này"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Mật khẩu bạn nhập không khớp")
        .required("Vui lòng điền vào trường này"),
    }),
  });

  return (
    <div className={cx("formRegisterContainer")}>
      <ToastContainer />
      <form className={cx("formRegister")} onSubmit={formik.handleSubmit}>
        <h3 className={cx("formRegister__heading")}>ĐĂNG KÝ THÀNH VIÊN MỚI </h3>
        {MENU_REGISTER.map((input) => (
          <FormRegister
            key={input.id}
            {...input}
            onChange={formik.handleChange}
            value={formik.values[input.name]}
            errors={formik.errors[input.name]}
            touched={formik.touched[input.name]}
          />
        ))}
        <div className={cx("formRegister__bottom")}>
          <button type="submit" className={cx("formRegister__bottom--btn")}>
            Đăng ký
          </button>
          <div className={cx("formRegister__bottom--newAccount")}>
            <label> Bạn đã có tài khoản ! </label>
            <NavLink to="/login" className={cx("formRegister__bottom--title")}>
              Đăng Nhập
            </NavLink>
          </div>
        </div>
      </form>
    </div>
  );
}
