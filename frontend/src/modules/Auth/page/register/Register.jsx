import classNames from "classnames/bind";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUpRegister } from "~/redux/slice/auth/AuthSlice";
import { MENU_REGISTER } from "../../component/constant";
import FormRegister from "../../component/FormRegister/FormRegister";
import styles from "./Register.module.scss";

const cx = classNames.bind(styles);

export default function Register() {
  const dispatch = useDispatch();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const password = `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,20}$`;
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      address: "",
      password_confirm: "",
    },
    onSubmit: async (values, actions) => {
      await dispatch(signUpRegister(values));

      // isSuccess === true
      //   ? Swal.fire("Vui lòng Kiểm tra email để lấy mã xác nhận") &&
      //     navigate("/veryfyEmail")
      //   : navigate("/user/register");

      //   actions.resetForm();
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(2, "Qua Ngan!")
        .max(50, "Qua dai roi b oi!")
        .required("Vui lòng điền vào trường này"),
      email: Yup.string()
        .email("Vui lòng nhập định dạng email hợp lệ")
        .required("Vui lòng điền vào trường này"),
      phoneNumber: Yup.string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Vui lòng điền vào trường này"),
      password: Yup.string()
        .matches(password, "Password is not valid")
        .required("Vui lòng điền vào trường này"),
      address: Yup.string()
        .min(2, "Qua Ngan!")
        .max(50, "Qua dai roi b oi!")
        .required("Vui lòng điền vào trường này"),
      password_confirm: Yup.string()
        .oneOf([Yup.ref("password"), null], "Mật khẩu bạn nhập không khớp")
        .required("Vui lòng điền vào trường này"),
    }),
  });

  return (
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
        <span className={cx("formRegister__bottom--title")}>
          Bạn đã có tài khoản !
        </span>
        {/* <NavLink
            to="/sign-in"
            style={{ color: "blue", textDecoration: "underline" }}
          >
            Đăng nhập
          </NavLink> */}
      </div>
    </form>
  );
}
