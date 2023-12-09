import React from "react";
import "./styles.css";

import "../../fonts/font-awesome/css/font-awesome.css";
import { Link } from "react-router-dom";

const Card = ({ title, imageUrl, link }) => {
  return (
    <Link to={"/product-category"} className='card'>
      <div
        className='card-image'
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className='card-text-container'>
        <h1>{title}</h1>
      </div>
    </Link>
  );
};

export default Card;
