import React from "react";
import "./Input.css";

const Input = ({
  type,
  value,
  onChange,
  placeholder,
  required,
  id,
  label,
  className,
  inputType,
}) => {
  const changeControl = (e) => {
    const inputValue = e.target.value;

    if (inputType === "number") {
      const regex = /^[0-9]*\.?[0-9]*$/;

      if (inputValue === "" || regex.test(inputValue)) {
        onChange(e);
      }
    } else if (inputType === "text") {
      const regex = /^[A-Za-zğüşıöçĞÜŞİÖÇ\s]*$/;

      if (inputValue === "" || regex.test(inputValue)) {
        onChange(e);
      }
    } else {
      onChange(e);
    }
  };

  return (
    <div className={`input-container ${className}`}>
      {label && <label htmlFor={id}> {label} </label>}
      <input
        className="custom-input"
        type={type || "text"}
        id={id}
        value={value}
        onChange={changeControl}
        placeholder={placeholder}
        required={required}
      />{" "}
    </div>
  );
};

export default Input;
