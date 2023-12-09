import React, { useState } from "react";
import "./style.css";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const ItemFilter = ({ title, items, onItemClick, onModalClose }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (value) => {
    setSelectedItem(value.name);
    onItemClick(title, value);
  };

  return (
    <div className='item-filter'>
      <p className='item-filter-title'>
        {title}{" "}
        <MdOutlineKeyboardArrowRight
          className={`toggle-icon isOpened }`}
          size={22}
        />
      </p>
      <ul className={`item-filter-items isOpened`}>
        {items.map((item, index) => (
          <li key={index}>
            <input
              type='radio'
              id={`${title}-${item.name}`}
              name={title}
              value={item.name}
              checked={selectedItem === item.name}
              onChange={() => handleItemClick(item)}
              onClick={onModalClose}
            />
            <label htmlFor={`${title}-${item.name}`}>{item.name}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemFilter;
