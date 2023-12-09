import React, { useEffect, useReducer } from "react";

import CartContext from "./cart-context";

const DEFAULT_CURRENCY = "€";

const loadCartState = () => {
  try {
    const serializedState = localStorage.getItem("cartState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const loadCurrencyState = () => {
  try {
    const serializedState = localStorage.getItem("currency");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveCartState = (state) => {
  try {
    const serializedState = JSON.stringify(state.items);
    localStorage.setItem("cartState", serializedState);
  } catch (err) {
    //TODO  Handle errors, e.g., if local storage is not available
  }
};
const saveCurrencyState = (currency) => {
  try {
    const serializedState = JSON.stringify(currency);
    localStorage.setItem("currency", serializedState);
  } catch (err) {
    //TODO  Handle errors, e.g., if local storage is not available
  }
};

const defaultCartState = {
  items: loadCartState() || [],
  notification: { status: "success", message: "Shporta ndryshoj" },
  currency: loadCurrencyState() || DEFAULT_CURRENCY, // Load currency from local storage or use default
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const existingCartItemIndex = state.items.findIndex((item) => {
      // Check both id and color_id if available
      if (action.item.color && action.item.color._id) {
        return (
          item.id === action.item.id && item.color._id === action.item.color._id
        );
      }
      // Check only id if color_id is not available
      return item.id === action.item.id;
    });

    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;
    let notifications;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        sasia: existingCartItem.sasia + action.item.sasia,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
      notifications = {
        status: "success",
        message: `Sasia e produktit ${action.item.emri} ndryshoj`,
      };
    } else {
      updatedItems = state.items.concat(action.item);
      notifications = {
        status: "success",
        message: `Produkti ${action.item.emri} u shtua ne shporte.`,
      };
    }

    return {
      items: updatedItems,
      notification: notifications,
      currency: state.currency, // Make sure to include the currency in the returned state
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex((item) => {
      // Check both id and color_id if available
      if (action.color_id) {
        return item.id === action.id && item.color._id === action.color_id;
      }
      // Check only id if color_id is not available
      return item.id === action.id;
    });

    const existingItem = state.items[existingCartItemIndex];

    let updatedItems;
    if (existingItem && existingItem.sasia === 1) {
      updatedItems = state.items.filter((item) => {
        // Filter out the item based on both id and color_id if available
        if (action.color_id) {
          return item.id !== action.id || item.color._id !== action.color_id;
        }
        // Filter out the item based on only id if color_id is not available
        return item.id !== action.id;
      });
    } else if (existingItem) {
      const updatedItem = {
        ...existingItem,
        sasia: existingItem.sasia - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      notification: {
        status: "success",
        message: "Produkti u zbrit nga shporta.",
      },
      currency: state.currency, // Make sure to include the currency in the returned state
    };
  }

  if (action.type === "DELETE_PRODUCT") {
    const deletedProductIndex = state.items.findIndex((item) => {
      // Check both id and color_id if available
      if (action.color_id) {
        return item.id === action.id && item.color._id === action.color_id;
      }
      // Check only id if color_id is not available
      return item.id === action.id;
    });

    if (deletedProductIndex === -1) {
      return state; // If the product to delete is not found, return the current state
    }

    const updatedItems = state.items.filter((item) => {
      // Filter out the item based on both id and color_id if available
      if (action.color_id) {
        return item.id !== action.id || item.color._id !== action.color_id;
      }
      // Filter out the item based on only id if color_id is not available
      return item.id !== action.id;
    });

    return {
      items: updatedItems,
      notification: { status: "alert", message: "Produkti u fshi nga shporta" },
      currency: state.currency, // Make sure to include the currency in the returned state
    };
  }

  if (action.type === "CLEAR_CART") {
    return {
      items: [],
      notification: { status: "alert", message: "Shporta u pastrua" },
      currency: state.currency, // Make sure to include the currency in the returned state
    };
  }
  if (action.type === "CHANGE_CURRENCY") {
    localStorage.setItem("currency", action.currency); // Save the new currency to local storage
    saveCurrencyState(action.currency);

    return {
      ...state,
      currency: action.currency,
      notification: {
        status: "success",
        message: `Currency changed to ${action.currency}`,
      },
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState,
  );
  useEffect(() => {
    saveCartState(cartState);
  }, [cartState]);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemToCartHandler = (id, color_id = null) => {
    dispatchCartAction({ type: "REMOVE", id, color_id });
  };

  const deleteProductFromCartHandler = (id, color_id = null) => {
    dispatchCartAction({ type: "DELETE_PRODUCT", id, color_id });
  };
  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR_CART" });
  };
  const changeCurrencyHandler = (currency) => {
    dispatchCartAction({ type: "CHANGE_CURRENCY", currency });
  };
  const cartContext = {
    items: cartState.items,
    notification: cartState.notification,
    currency: cartState.currency,
    changeCurrency: changeCurrencyHandler,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
    deleteProduct: deleteProductFromCartHandler,
    clearCart: clearCartHandler, // Add the new function to the context
    addProductModal: false,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
