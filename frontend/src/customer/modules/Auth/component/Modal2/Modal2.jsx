import classNames from "classnames/bind";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmPassword,
  setValueChangePassword,
} from "~/redux/slice/auth/AuthSlice";
import styles from "../../component/Auth.module.scss";
const cx = classNames.bind(styles);

const Modal2 = ({ setIsOpenModal2 }) => {
  const { valuesChangePassword } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(setValueChangePassword({ ...valuesChangePassword, ...values }));
    dispatch(confirmPassword(valuesChangePassword));
  };

  return (
    <Formik initialValues={{ code: "" }} onSubmit={handleSubmit}>
      <Form id="myModal" className={cx("modal")}>
        <div className={cx("modal-content")}>
          <div className={cx("modal-content__top")}>
            <h3>Quên Mật khẩu</h3>
            <span onClick={() => setIsOpenModal2(false)}>
              <div className={cx("close")}>&times;</div>
            </span>
          </div>
          <div className={cx("modal-content__center")}>
            <label htmlFor="inputField">Nhập Code </label>
            <Field
              type="text"
              id="inputField"
              name="code"
              className={cx("input")}
            />
            <ErrorMessage
              name="code"
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
export default Modal2;
