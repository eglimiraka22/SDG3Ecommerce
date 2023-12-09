// CurrencyDropdown.js
import React from "react";
import "./style.css";
const CurrencyDropdown = ({ currency, onCurrencyChange }) => {
  return (
    <div className='currency-dropdown'>
      <label htmlFor='currency'></label>
      <select
        id='currency'
        value={currency}
        onChange={(e) => onCurrencyChange(e.target.value)}
      >
        <option value='€'> €</option>
        <option value='$'>$</option>
        <option value='ALL'>ALL</option>
      </select>
    </div>
  );
};

export default CurrencyDropdown;
