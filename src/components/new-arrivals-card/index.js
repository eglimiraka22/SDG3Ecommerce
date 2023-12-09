import React, { useContext, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import useCurrency from "../../hooks/useCurrency";
import CartContext from "../../store/cart-context";
const NewArrivalsCard = ({ image, price, id, name, discountPrice }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { convertCurrency ,convertPriceStringValue } = useCurrency();
  const cartCtx = useContext(CartContext);

  const onMouseOver = () => {
    setIsHovered(true);
  };

  const onMouseOut = () => {
    setIsHovered(false);
  };

  const onProductClick = () => {};

  const priceCoverted = convertCurrency(price);
  const discountConverted = convertCurrency(discountPrice);

  return (
    <div
      className={`new-arrival-card  ${isHovered ? "hovered" : ""}`}
      onClick={onProductClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <Link onClick={() => (window.location.href = `/product/${id}`)}>
        <div
          className={`new-arrival-image`}
          style={{
            backgroundImage: `url(${image})`,
          }}
        ></div>
      </Link>
      <hr />
      <div className='new-arrival-info'>
        <h3 className='new-arrival-name'>{name}</h3>
        <h3 className='new-arrival-description'>Product Description</h3>
        {discountPrice && discountPrice > 0 ? (
          <h3 className='new-arrival-price'>
            <span className='discount-price'>
              {convertPriceStringValue(priceCoverted)}
            </span>
            {convertPriceStringValue(discountConverted)}
          </h3>
        ) : (
          <h3 className='new-arrival-price'>
              {convertPriceStringValue(priceCoverted)}
          </h3>
        )}
      </div>
    </div>
  );
};

export default NewArrivalsCard;
