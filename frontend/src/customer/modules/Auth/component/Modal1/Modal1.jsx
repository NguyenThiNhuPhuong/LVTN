import classNames from "classnames/bind";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  sendEmail,
  setValueChangePassword,
} from "~/redux/slice/auth/AuthSlice";
import styles from "../../component/Auth.module.scss";
const cx = classNames.bind(styles);
function getFormData(object) {
  const formData = new FormData();
  Object.keys(object).forEach((key) => formData.append(key, object[key]));
  return formData;
}
const Modal1 = ({ setIsOpenModal1 }) => {
  const dispatch = useDispatch();
  const { valuesChangePassword } = useSelector((state) => state.auth);

  const handleSubmit = (values) => {
    const data = getFormData(values);
    dispatch(setValueChangePassword({ ...valuesChangePassword, ...values }));
    dispatch(sendEmail(data));
  };
  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
      })}
      onSubmit={handleSubmit}
    >
      <Form id="myModal" className={cx("modal")}>
        <div className={cx("modal-content")}>
          <div className={cx("modal-content__top")}>
            <h3>Quên Mật khẩu</h3>
            <span onClick={() => setIsOpenModal1(false)}>
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
export default Modal1;
