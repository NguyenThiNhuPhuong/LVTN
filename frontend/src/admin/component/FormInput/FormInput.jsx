import "./FormInput.scss";
const FormInput = (props) => {
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
      <div className="formInput">
        <div className="formInput__icon">{icon}</div>
        <input
          type={type}
          id={name}
          onChange={onChange}
          value={value}
          className="formInput__input"
          placeholder={label}
        />
      </div>
      {touched && errors && (
        <span className="formInput__err">{errorMessage}</span>
      )}
    </>
  );
};

export default FormInput;
