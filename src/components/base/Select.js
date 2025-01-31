import React from "react";

const Select = ({ id, label, value, onChange, options, required }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}> {label} </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className="form-control"
      >
        <option value=""> Seçiniz </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
