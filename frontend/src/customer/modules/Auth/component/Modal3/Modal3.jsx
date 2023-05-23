import classNames from "classnames/bind";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { resetPassword } from "~/redux/slice/auth/AuthSlice";
import styles from "../../component/Auth.module.scss";
const cx = classNames.bind(styles);
function getFormData(object) {
  const formData = new FormData();
  Object.keys(object).forEach((key) => formData.append(key, object[key]));
  return formData;
}
const Modal3 = ({ setIsOpenModal3 }) => {
  const { valuesChangePassword } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    const data = getFormData({ ...valuesChangePassword, ...values });
    dispatch(resetPassword(data));
  };

  return (
    <Formik
      initialValues={{ password: "", confirmPassword: "" }}
      validationSchema={Yup.object({
        password: Yup.string()
          .required("Password is required")
          .min(6, "Password must be at least 6 characters long"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm password is required"),
      })}
      onSubmit={handleSubmit}
    >
      <Form id="myModal" className={cx("modal")}>
        <div className={cx("modal-content")}>
          <div className={cx("modal-content__top")}>
            <h3>Quên Mật khẩu</h3>
            <span onClick={() => setIsOpenModal3(false)}>
              <div className={cx("close")}>&times;</div>
            </span>
          </div>
          <div className={cx("modal-content__center")}>
            <label htmlFor="inputField">Mật khẩu mới </label>
            <Field
              type="text"
              id="inputField"
              name="password"
              className={cx("input")}
            />
            <ErrorMessage
              name="password"
              component="div"
              className={cx("error-message")}
            />
            <label htmlFor="inputField">Nhập lại mật khẩu </label>
            <Field
              type="text"
              id="inputField"
              name="confirmPassword"
              className={cx("input")}
            />
            <ErrorMessage
              name="confirmPassword"
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
export default Modal3;
