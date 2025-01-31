import React from "react";

const Checkbox = ({ checked, onChange, label, id, className }) => {
  return (
    <div className={className}>
      <input type="checkbox" id={id} checked={checked} onChange={onChange} />
      {label && <label htmlFor={id}> {label} </label>}
    </div>
  );
};

export default Checkbox;
