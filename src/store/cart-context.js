import React from "react";

const CartContext = React.createContext({
  items: [],
  notification: [],
  currency: "",
  addItem: (item) => {},
  removeItem: (id, color_id) => {},
  changeCurrency: (currency) => {},

  deleteProduct: (id, color_id) => {},
  clearCart: () => {},
  addProductModal: false,
});

export default CartContext;
