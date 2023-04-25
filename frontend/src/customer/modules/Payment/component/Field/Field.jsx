import React from "react";
import "./Field.scss";
function Field({ className, label, type, value, onChange }) {
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
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default Field;
