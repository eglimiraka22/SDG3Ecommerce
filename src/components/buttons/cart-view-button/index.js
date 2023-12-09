import React from 'react';
import './style.css';
const CartButton = ({ onClick, title }) => {
  return (
    <button className='cart-actions-button' onClick={onClick}>
      {title}
    </button>
  );
};

export default CartButton;