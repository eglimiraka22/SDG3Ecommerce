import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import { AiOutlineDelete } from "react-icons/ai";
import CartContext from "../../store/cart-context";
import "../../fonts/font-awesome/css/font-awesome.css";
import useCurrency from "../../hooks/useCurrency";

const CartDropdown = ({ closeDropdown }) => {
  const cartCtx = useContext(CartContext); // Access the addItemToCart function from the CartContext
  const [totalCost, setTotalCost] = useState(0);
  const zbritSasineEProduktit = (id, color_id = null) => {
    cartCtx.removeItem(id, color_id);
  };
  const { convertCurrency, convertPriceStringValue } = useCurrency();

  useEffect(() => {
    // Calculate the total cost of items when cartCtx.items changes
    const calculatedTotalCost = cartCtx.items.reduce(
      (acc, product) => acc + convertCurrency(product.cmimi) * product.sasia,
      0,
    );
    setTotalCost(calculatedTotalCost);
  }, [cartCtx.items, convertCurrency]);

  return (
    <div
      className={
        cartCtx.items.length > 0 ? "cart-dropdown" : "empty-cart-dropdown"
      }
    >
      {cartCtx.items.length > 0 ? (
        <>
          <div className='cart-list'>
            {cartCtx.items.map((product, index) => (
              <div className='cart-item' key={index}>
                <img src={product.imazhi} alt={product.emri} />
                <span className='cart-item-details'>
                  <p className='cart-item-name'>
                    {product.emri}
                    <i
                      onClick={() =>
                        zbritSasineEProduktit(
                          product.id,
                          product.color ? product.color._id : null,
                        )
                      }
                    >
                      <AiOutlineDelete size={22} />
                    </i>
                  </p>
                  {product.color && (
                    <p className='cart-item-name-color'>
                      {" "}
                      <span
                        className='cart-products-product-info-color'
                        style={{
                          backgroundColor: `${product.color.code}`,

                          paddingInline: "15px",
                          marginLeft: "5px",
                        }}
                      ></span>
                    </p>
                  )}
                  <p className='cart-item-price'>
                    {convertPriceStringValue(convertCurrency(product.cmimi))}{" "}
                    <span className='cart-item-quantity'>
                      {" "}
                      X {product.sasia}
                    </span>
                  </p>
                </span>
              </div>
            ))}
          </div>
          <div className='cart-total'>
            <p>Totali</p>
            <p>{convertPriceStringValue(totalCost.toFixed(2))}</p>
          </div>
          <div className='cart-buttons'>
            <a href='/cart' className='cart-button  ' onClick={closeDropdown}>
              <p>View Cart</p>
            </a>
            <a href='/checkout' className='cart-button' onClick={closeDropdown}>
              <p>Checkout</p>
            </a>
          </div>
        </>
      ) : (
        <>
          <h3 className='cart-message'>Nuk keni asnje produkt ne shporte</h3>
          <div className='cart-buttons'>
            <a
              href='/product-category'
              className='cart-button  '
              onClick={closeDropdown}
            >
              <p>Shto produkt</p>
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDropdown;
