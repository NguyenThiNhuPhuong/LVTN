import React from "react";

function InputForm({
  label,
  name,
  type,
  checked,
  onChange,
  onClick,
  value,
  className,
  classNameContent,
}) {
  return (
    <div className={classNameContent ? classNameContent : ""}>
      <input
        type={type}
        name={name}
        onChange={onChange}
        onClick={onClick}
        value={value}
        className={className ? className : ""}
        checked={checked}
      />
      <label>{label}</label>
      {/* <p>{errorMessage}</p> */}
    </div>
  );
}

export default InputForm;
