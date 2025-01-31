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
}) => {
  return (
    <div className={`input-container ${className}`}>
      {label && <label htmlFor={id}> {label} </label>}
      <input
        className="custom-input"
        type={type || "text"}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default Input;
