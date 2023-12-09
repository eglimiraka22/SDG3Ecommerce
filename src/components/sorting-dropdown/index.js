import React from "react";
import Select from "react-select";
import "./style.css";

const SortDropdown = ({ sortOption, sortOptions, onSortChange }) => {
    const customStyles = {
        control: (provided,state) => ({
          ...provided,
          borderRadius: "7px",
          backgroundColor:"var(--background-color)",
          width: "100%",
          minWidth:"250px",
          outline: state.isFocused ?   "1px solid var(--primary-color)" : "1px solid #ccc",
          flex:'1',
          padding: "2px 4px", // Add padding
          boxShadow: "none", // Remove box shadow
          border:"none",
          cursor:"pointer",

         
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? "var(--primary-color)" : "white",
          color: state.isSelected ? "white" : "black",
          ":hover": {
            backgroundColor: "var(--primary-color)",
            color: "white",
            outline: "2px solid white",
            cursor:"pointer",
          },
        }),
      };
      

  return (
    <div className='sort-container'>
      <div className="select-container">
      <Select
        id='sort'
        placeholder="Sort products:"
        value={sortOptions.find((option) => option.value === sortOption)}
        onChange={(selectedOption) => onSortChange(selectedOption.value)}
        options={sortOptions}
        styles={customStyles}
        isSearchable={false} // Prevent typing inside the select
      />
      </div>
    </div>
  );
};

export default SortDropdown;
