// AdminCurrencyView.js
import React, { useState } from "react";
import useAdminCurrency from "../../hooks/useAdminCurrency";
import "./style.css";

const AdminCurrencyView = () => {
  const { currencyData, updateCurrencyRates } = useAdminCurrency();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currencyNewData, setCurrencyNewData] = useState({});

  const handleUpdateRates = () => {
    setIsModalOpen(true);
  };

  const handleConfirmUpdate = () => {
    // Make sure all values are valid numbers
    if (!isNaN(currencyData.dollar) && !isNaN(currencyData.all)) {
      updateCurrencyRates(currencyNewData);
      setIsModalOpen(false);
    } else {
      alert("Invalid input. Please enter valid numbers.");
    }
  };

  const handleCancelUpdate = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrencyNewData((prevRates) => ({
      ...prevRates,
      [name]: value,
    }));
  };
  return (
    <div className='admin-currency-view'>
      <div className='currency-rate-container'>
        <h2>Current Exchange Rates</h2>
        <p>Euro: 1</p>
        <p>Dollar: {currencyData.dollar}</p>
        <p>ALL: {currencyData.all}</p>
        <button onClick={handleUpdateRates}>Update Currencies</button>
      </div>

      {isModalOpen && (
        <div className='modal-currency-converter'>
          <div className='modal-currency-converter-content'>
            <h3>Update Currency</h3>
            <br />
            <label htmlFor='dollar'>Dollar Exchange Rate:</label>
            <input
              type='number'
              id='dollar'
              name='dollar'
              step='any'
              defaultValue={currencyData.dollar}
              onChange={handleInputChange}
            />
            <label htmlFor='all'>ALL Exchange Rate:</label>
            <input
              type='number'
              id='all'
              name='all'
              step='any'
              defaultValue={currencyData.all}
              onChange={handleInputChange}
            />
            <div className='modal-currency-converter-buttons'>
              <button onClick={handleConfirmUpdate}>Yes</button>
              <button onClick={handleCancelUpdate}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCurrencyView;
