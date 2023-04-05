import classNames from "classnames/bind";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { MENU_LOGIN } from "~/components/constant/Menu";
import { signInUser } from "~/redux/slice/auth/AuthSlice";
import FormRegister from "../../component/FormRegister/FormRegister";
import styles from "../../component/Auth.module.scss";

const cx = classNames.bind(styles);

export default function Login() {
  const dispatch = useDispatch();

  const password = `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,20}$`;
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, actions) => {
      await dispatch(signInUser(values));
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
    <form className={cx("formRegister")} onSubmit={formik.handleSubmit}>
      <h3 className={cx("formRegister__heading")}>ĐĂNG NHẬP </h3>
      {MENU_LOGIN.map((input) => (
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
          Đăng Nhập
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
