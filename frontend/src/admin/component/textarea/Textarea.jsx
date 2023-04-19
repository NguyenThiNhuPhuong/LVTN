import React from "react";
import "./Textarea.scss";
function Textarea({ onChange }) {
  return (
    <div className="formDesc">
      <label>Description</label>
      <textarea rows="10" cols="50" onChange={onChange} />
    </div>
  );
}

export default Textarea;
