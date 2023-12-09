import React, { useContext, useState } from "react";
import "./style.css";
import CartContext from "../../store/cart-context";
import AddButton from "../buttons/add-button";
import { Link } from "react-router-dom";

const RelatedProductCard = ({ product, handleNjoftimin }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cartCtx = useContext(CartContext);
  const onMouseOver = () => {
    setIsHovered(true);
  };

  const onMouseOut = () => {
    setIsHovered(false);
  };

  // const ShtoProduktinNeShporte = () => {
  //   // Dispatch an action to add the product to the cart
  //   cartCtx.addItem({
  //     id: product._id,
  //     emri: product.name,
  //     shortDescription: product.shortDescription,
  //     cmimi:
  //       !product.discountPrice || product.discountPrice === 0
  //         ? product.price
  //         : product.discountPrice,
  //     imazhi: product.productImages[0].asset.url,
  //     sasia: 1,
  //   });
  //   handleNjoftimin(cartCtx.notification.status);
  // };

  const convertPriceValue = (price) => {
    if (cartCtx.currency === "$") {
      return `$ ${price}`;
    } else if (cartCtx.currency === "ALL") {
      return ` ${Math.round(price / 10) * 10} ALL`;
    } else {
      return `${price} €`;
    }
  };
  return (
    <div
      className={`related-card  ${isHovered ? "hovered" : ""}`}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <Link
        onClick={() => {
          window.location.href = `/product/${product._id}`;
        }}
      >
        {/* using to or onclick  */}

        <div
          className={`related-image`}
          style={{
            backgroundImage: `url(${product.productImages[0].asset.url})`,
          }}
        ></div>
      </Link>

      <div className='related-info'>
        {/* <h3 className='related-brand'>{product.brand}</h3> */}
        <h3 className='related-name'>{product.name}</h3>
        {product.discountPrice && product.discountPrice > 0 ? (
          <h3 className='related-price'>
            <span className='old-price'>
              {" "}
              {convertPriceValue(product.price)}
            </span>
            {convertPriceValue(product.discountPrice)}
          </h3>
        ) : (
          <h3 className='related-price'>{convertPriceValue(product.price)}</h3>
        )}
        <AddButton
          onClick={() => {
            window.location.href = `/product/${product._id}`;
          }}
          Text='Add product'
        />
      </div>
    </div>
  );
};

export default RelatedProductCard;
