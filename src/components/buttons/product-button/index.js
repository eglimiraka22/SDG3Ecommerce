import React from 'react';
import './style.css';
const ProductButton = ({ onClick, title }) => {
  return (
    <button className='cart-product-button' onClick={onClick}>
      {title}
    </button>
  );
};

export default ProductButton;