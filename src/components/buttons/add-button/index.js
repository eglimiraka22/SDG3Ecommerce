import React from "react";
import { BiAddToQueue, BiSolidCart } from "react-icons/bi";
import "./style.css";
const AddButton = ({ onClick, Text, noIcon }) => {
  return (
    <button className='related-button' onClick={onClick}>
      <span className=''>
        {noIcon ? <BiAddToQueue size={22} /> : <BiSolidCart size={22} />}
      </span>
      {Text}
    </button>
  );
};

export default AddButton;
