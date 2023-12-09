// PriceFilter.js

import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import { Link } from "react-router-dom";
import "./style.css";

const PriceFilter = ({ onPriceChange, resetFilters }) => {
  const [value, setValue] = useState([0, 100]);

  const rangeSelector = (event, newValue) => {
    setValue(newValue);
  };

  const setFilteredPrice = () => {
    onPriceChange(value);
  };

  const CustomSliderStyles = {
    "& .MuiSlider-thumb": {
      width: "12px",
      height: "12px",
      borderRadius: "0",
      backgroundColor: "var(--primary-color)",
      boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.4)",
    },

    "& .MuiSlider-thumb.Mui-focusVisible , .MuiSlider-thumb:hover": {
      boxShadow: "none !important",
    },
    "& .MuiSlider-track": {
      color: "var(--primary-color) !important",
    },
    "& .MuiSlider-rail": {
      color: "#acc4e4",
    },
    "& .MuiSlider-active": {
      outline: "none",
      color: "#db4f6d",
    },
    "& .Mui-focusVisible": {
      outline: "none",
      color: "#db4f6d",
    },
  };

  return (
    <div className='price-filter'>
      <Link className='reset-filter-button' onClick={resetFilters}>
        Reset Filters
      </Link>
      <h4 className='price-filter-title'>Price </h4>
      <Slider
        sx={CustomSliderStyles}
        valueLabelDisplay='off'
        getAriaLabel={() => "Price Range"}
        min={0}
        max={100}
        value={value}
        onChange={rangeSelector}
        disableSwap
        variant='standard'
      />
      <div className='btn-filter-container'>
        <button className='filter-button' onClick={setFilteredPrice}>
          Filtro
        </button>
      </div>
      <div className='price-range'>
        <span className='min-price'>Price: {value[0]} € - </span>
        <span className='max-price'> {value[1]} € </span>
      </div>
    </div>
  );
};

export default PriceFilter;
