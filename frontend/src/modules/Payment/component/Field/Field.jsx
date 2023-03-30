import React from "react";
import "./Field.scss";
function Field({ className, label, type, value }) {
  return (
    <div className={className ? `${className} field` : "field"}>
      <div className="field__input-wrapper">
        <label className="field__label">{label}</label>
        <input
          className="field__input"
          placeholder={label}
          type={type}
          required
          value={value}
        />
      </div>
    </div>
  );
}

export default Field;
