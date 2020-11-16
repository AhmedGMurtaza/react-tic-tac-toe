import React from "react";

export default (props) => {
  const { click, value } = props;
  const val = value ? value : "";
  return (
    <div onClick={click} className={`card ${val}`}>
      <span>{val}</span>
    </div>
  );
};
