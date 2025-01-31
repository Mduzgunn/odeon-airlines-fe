import React from "react";
import "./Button.css";

const Button = ({ onClick, type, children, className, disabled }) => {
  return (
    <button
      className={`custom-button ${className}`}
      type={type || "button"}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
