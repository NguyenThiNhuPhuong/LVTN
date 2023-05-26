import React from "react";

function InputUser({ onChange, value, label, error, name, id }) {
  return (
    <div className="content__input">
      <input onChange={onChange} value={value} name={name} id={id} />
      <label>{label}</label>
      <p>{error}</p>
    </div>
  );
}

export default InputUser;
