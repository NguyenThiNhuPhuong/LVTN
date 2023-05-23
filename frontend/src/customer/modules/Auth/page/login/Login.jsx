import classNames from "classnames/bind";
import styles from "../../component/Auth.module.scss";

import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { MENU_LOGIN } from "~/components/constant/Menu";

import { ToastContainer, toast } from "react-toastify";
import { signInUser } from "~/redux/slice/auth/AuthSlice";
import FormRegister from "../../component/FormRegister/FormRegister";
import Modal1 from "../../component/Modal1/Modal1";
import Modal2 from "../../component/Modal2/Modal2";
import Modal3 from "../../component/Modal3/Modal3";

const cx = classNames.bind(styles);

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpenModal1, setIsOpenModal1] = useState(false);
  const [isOpenModal2, setIsOpenModal2] = useState(false);
  const [isOpenModal3, setIsOpenModal3] = useState(false);

  const { role, isLoading, messenger } = useSelector((state) => state.auth);
  const password = `^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,20}$`;

  useEffect(() => {
    const toastConfig = {
      position: toast.POSITION.TOP_RIGHT,
    };

    if (isLoading) {
      toast.info("Bạn vui lòng chờ trong giây lát", toastConfig);
    } else if (messenger === "Verification code has been sent to your email.") {
      toast.success(
        "Verification code has been sent to your email.",
        toastConfig
      );
      setIsOpenModal1(false);
      setIsOpenModal2(true);
    } else if (messenger === "successful") {
      toast.success("Vui lòng điền vào form để thay đổi mật khẩu", toastConfig);
      setIsOpenModal2(false);
      setIsOpenModal3(true);
    } else if (messenger === "Password reset successful.") {
      toast.info("Bạn đã thay đổi mật khẩu thành công", toastConfig);
      setIsOpenModal3(false);
    }
  }, [isLoading, messenger, setIsOpenModal1, setIsOpenModal2, setIsOpenModal3]);
  //-----authorization---------
  console.log(role);
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
      {isOpenModal1 && <Modal1 setIsOpenModal1={setIsOpenModal1} />}
      {isOpenModal2 && <Modal2 setIsOpenModal2={setIsOpenModal2} />}
      {isOpenModal3 && <Modal3 setIsOpenModal3={setIsOpenModal3} />}

      <ToastContainer />
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
                required={isOpenModal1 ? false : true}
              />
              <label htmlFor=" Remember Me"> Remember Me</label>
            </div>
            <button type="button" onClick={() => setIsOpenModal1(true)}>
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
