import "./FormInput.scss";
const FormInput = (props) => {
  const {
    //props_input
    icon,
    label,
    name,
    type,
    //props_formik
    value,
    error,
    onChange,
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
      <span className="formInput__err">{error}</span>
    </>
  );
};

export default FormInput;
