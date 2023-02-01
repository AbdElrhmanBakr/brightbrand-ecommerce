import { createContext, useEffect, useState } from "react";

//! Helper Functions
const addCartItem = (itemToAdd, cartItems) => {
  const cartItemExist = cartItems.find((item) => item.id === itemToAdd.id); // <-- return true or false
  if (cartItemExist) {
    return cartItems.map((item) =>
      item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  } else {
    return [...cartItems, { ...itemToAdd, quantity: 1 }];
  }
};

const removeCartItem = (itemToRemove, cartItems) => {
  const cartItemExist = cartItems.find((item) => item.id === itemToRemove.id); // <-- return value = true or 0 = false

  if (cartItemExist.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemExist.id);
  }
  return cartItems.map((item) =>
    item.id === itemToRemove.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
};

const deleteCartItem = (itemToDelete, cartItems) => {
  //Clear Whole Cart
  if (itemToDelete === cartItems) {
    return [];
  }
  return cartItems.filter((cartItem) => cartItem.id !== itemToDelete.id);
};

//! Context
export const cartContext = createContext({
  displayCart: false,
  setDisplayCart: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  deleteItemFromCart: () => {},
  cartCount: 0,
  cartTotalPrice: 0,
});

//! Main Function
export const CartProvider = ({ children }) => {
  //! Stats
  const [displayCart, setDisplayCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  //! Functions
  const addItemToCart = (itemToAdd) => {
    setCartItems(addCartItem(itemToAdd, cartItems));
  };

  const removeItemFromCart = (itemToRemove) => {
    setCartItems(removeCartItem(itemToRemove, cartItems));
  };

  const deleteItemFromCart = (itemToDelete) => {
    setCartItems(deleteCartItem(itemToDelete, cartItems));
  };

  useEffect(() => {
    const cartItemsCount = cartItems.reduce(
      (accum, item) => accum + item.quantity,
      0
    );
    setCartCount(cartItemsCount);
  }, [cartItems]);

  useEffect(() => {
    const cartItemsTotalPrice = cartItems.reduce(
      (accum, item) => accum + item.price * item.quantity,
      0
    );
    setCartTotalPrice(cartItemsTotalPrice);
  }, [cartItems]);

  //! Provided Values
  const value = {
    displayCart,
    setDisplayCart,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    deleteItemFromCart,
    cartCount,
    cartTotalPrice,
  };

  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};
