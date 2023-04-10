import React from "react";
import "./Textarea.scss";
function Textarea({ setContent }) {
  return (
    <div className="formDesc">
      <label>Description</label>
      <textarea
        rows="10"
        cols="50"
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
    </div>
  );
}

export default Textarea;
