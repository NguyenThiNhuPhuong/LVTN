import classNames from "classnames/bind";
import styles from "./FormRegister.module.scss";

const cx = classNames.bind(styles);
const FormRegister = (props) => {
  const {
    //props_input
    icon,
    label,
    name,
    type,
    onChange,
    errorMessage,
    //props_formik
    value,
    errors,
    touched,
  } = props;

  return (
    <>
      <div className={cx("formGroup")}>
        <div className={cx("formGroup__icon")}>{icon}</div>
        <input
          type={type}
          id={name}
          onChange={onChange}
          value={value}
          className={cx("formGroup__input")}
          placeholder={label}
        />
      </div>
      {touched && errors && (
        <span className={cx("formGroup__err")}>{errorMessage}</span>
      )}
    </>
  );
};

export default FormRegister;
