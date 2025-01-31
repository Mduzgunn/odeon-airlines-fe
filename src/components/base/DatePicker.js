import React from "react";

const DatePicker = ({ id, label, value, onChange, required }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}> {label} </label>
      <input
        type="date"
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className="form-control"
      />
    </div>
  );
};

export default DatePicker;
