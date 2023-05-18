import { useState } from "react";
import * as Yup from "yup";
import "./Textarea.scss";
const validationSchema = Yup.object({
  description: Yup.string().required("Vui lòng nhập Description"),
});

function Textarea({ onChange, value }) {
  const [validationError, setValidationError] = useState("");

  const validateDescription = async () => {
    try {
      await validationSchema.validate({ description: value });
      setValidationError(""); // No error, reset validation error
    } catch (error) {
      setValidationError(error.message); // Set the validation error message
    }
  };
  return (
    <div className="formDesc">
      <label>Description</label>
      <textarea
        rows="10"
        cols="50"
        onChange={onChange}
        onBlur={validateDescription}
        value={value}
      />
      {validationError && <p className="error">{validationError}</p>}
    </div>
  );
}

export default Textarea;
