import React from "react";
import "./Textarea.scss";
function Textarea({ onChange, value }) {
  return (
    <div className="formDesc">
      <label>Description</label>
      <textarea rows="10" cols="50" onChange={onChange} value={value} />
    </div>
  );
}

export default Textarea;
