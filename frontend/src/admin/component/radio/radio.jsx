import React from "react";
import "./radio.scss";
function Radio({ setActive, active, input, key }) {
  return (
    <div className="formRadio" key={key}>
      <input
        type="radio"
        name={input.name}
        onClick={(e) => setActive(input.id)}
        checked={input.id === active ? true : false}
      />
      <label>{input.type}</label>
    </div>
  );
}

export default Radio;
