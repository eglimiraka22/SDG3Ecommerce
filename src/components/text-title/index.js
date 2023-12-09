import React from "react";
import "./styles.css";
const TextHeader = ({ text }) => {
  return (
    <div className='text-header'>
      <h1>{text}</h1>
    </div>
  );
};

export default TextHeader;
