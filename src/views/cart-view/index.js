import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { IoCloseSharp } from "react-icons/io5";
import CartButton from "../../components/buttons/cart-view-button";
import CartContext from "../../store/cart-context";
import { Link } from "react-router-dom";
import useScrollTop from "../../hooks/useScrollTop";
import "../../fonts/font-awesome/css/font-awesome.css";
import { ToastContainer, toast } from "react-toastify";
import useCurrency from "../../hooks/useCurrency";
import AddButton from "../../components/buttons/add-button";

const CartView = (props) => {
  useScrollTop(1);
  const { convertCurrency, convertPriceStringValue } = useCurrency();

  const cartCtx = useContext(CartContext);
  const updatedItems = cartCtx.items.map((item) => ({
    ...item,
    cmimi: convertCurrency(item.cmimi),
  }));

  // Create a new cart context with the updated items
  const updatedCartCtx = {
    ...cartCtx,
    items: updatedItems,
  };

  const [totalCost, setTotalCost] = useState(0);
  const shtoSasineEProduktit = (product) => {
    if (product) {
      cartCtx.addItem({
        id: product.id,
        emri: product.emri,
        cmimi: product.cmimi,
        imazhi: product.imazhi,
        masa: product.masa,
        color: product.color,
        sasia: 1,
      });
      toast.success("Product added to cart!", {
        position: "top-right",
        autoClose: 800,
      });
    }
  };

  const zbritSasineEProduktit = (id, color_id) => {
    if (id) {
      cartCtx.removeItem(id, color_id);
    }

    toast.success("Product Quanity Updated!", {
      position: "top-right",
      autoClose: 800,
    });
  };

  const fshijProduktin = (id, color_id) => {
    cartCtx.deleteProduct(id, color_id);
    toast.warning("Product deleted from cart!", {
      position: "top-right",
      autoClose: 800,
    });
  };

  // Calculate Totalin
  useEffect(() => {
    // Calculate the total cost of items when cartCtx.items changes
    const calculatedTotalCost = cartCtx.items.reduce(
      (acc, product) => acc + convertCurrency(product.cmimi) * product.sasia,
      0,
    );
    setTotalCost(calculatedTotalCost);
  }, [cartCtx.items, convertCurrency]);

  return (
    <main>
      <ToastContainer />
      <div className='cart'>
        <div className='cart-container'>
          <div className='cart-headers'>
            <h2 className='cart-headers-product'>Product</h2>
            <div className='cart-headers-items'>
              <h2 className='cart-headers-price'>Price</h2>
              <h2 className='cart-headers-quantity'>Quantity</h2>
              <h2 className='cart-headers-total'>Total</h2>
            </div>
          </div>
          <div className='cart-products-container'>
            {updatedCartCtx.items.map((product, index) => (
              <div className='cart-products' key={index}>
                <div className='cart-products-product'>
                  <Link to={`/product/${product.id}`}>
                    <img src={product.imazhi} alt={product.emri} />
                  </Link>
                  <div className='cart-products-product-details'>
                    <h3>{product.emri}</h3>
                    <div className='cart-products-product-info'>
                      {product.color && (
                        <p>
                          Color :{" "}
                          <span
                            className='cart-products-product-info-color'
                            style={{
                              backgroundColor: `${product.color.code}`,

                              paddingInline: "8px",
                              marginInline: "5px",
                            }}
                          ></span>
                          <span
                            style={{
                              fontWeight: "700",
                            }}
                          >
                            {product.color.nr}
                          </span>{" "}
                        </p>
                      )}{" "}
                    </div>
                  </div>
                </div>
                <div className='cart-products-items'>
                  <div className='cart-products-price'>
                    {convertPriceStringValue(product.cmimi)}
                    {}
                  </div>
                  <div className='cart-products-quantity'>
                    <button
                      onClick={() =>
                        zbritSasineEProduktit(
                          product.id,
                          product.color ? product.color._id : null,
                        )
                      }
                    >
                      -
                    </button>
                    <input type='text' value={product.sasia} readOnly />
                    <button onClick={() => shtoSasineEProduktit(product)}>
                      +
                    </button>
                  </div>
                  <div className='cart-products-total'>
                    {convertPriceStringValue(product.cmimi * product.sasia)}{" "}
                  </div>
                  <div
                    className='cart-products-remove '
                    onClick={() =>
                      fshijProduktin(
                        product.id,
                        product.color ? product.color._id : null,
                      )
                    }
                  >
                    <IoCloseSharp size={18} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='cart-actions'>
          <div className='cart-actions-left'>
            <Link to='/product-category'>
              <AddButton Text='Add More' noIcon />
            </Link>
          </div>
          <div className='cart-actions-right'>
            <span className='cart-actions-total'>
              {convertPriceStringValue(totalCost.toFixed(2))}
            </span>

            <div className='cart-actions-checkout'>
              <Link to='/checkout'>
                <AddButton Text='Checkout' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartView;
