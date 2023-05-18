import React from "react";

function InputUser({ onChange, value, label, error }) {
  return (
    <div className="content__input">
      <input onChange={onChange} value={value} />
      <label>{label}</label>
      <p>{error}</p>
    </div>
  );
}

export default InputUser;
