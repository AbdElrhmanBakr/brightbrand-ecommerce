import { createContext, useReducer } from "react";
import { createAction } from "../utils/Reducer/Reducer";

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

//! Reducers Actions Object
const CART_ACTION_TYPES = {
  SET_CART_DISPLAY: "SET_CART_DISPLAY",
  SET_CART_ITEMS: "SET_CART_ITEMS",
};

//! Reducers Function
const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_DISPLAY:
      return { ...state, displayCart: payload };
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, ...payload };
    default:
      throw new Error(`Unknown Type ${type} in userReducer`);
  }
};

//! Reducers Initial State
const INITIAL_STATE = {
  displayCart: false,
  cartItems: [],
  cartCount: 0,
  cartTotalPrice: 0,
};

//! Main Function
export const CartProvider = ({ children }) => {
  //! Reducers
  //Replacing all states in Initial State
  //All setStates --> With new Functions that trigger the dispatch
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { displayCart, cartItems, cartCount, cartTotalPrice } = state;

  //! Reducers Functions
  const setDisplayCart = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_CART_DISPLAY, bool));
  };

  const updateCartItemsReducer = (newCartItems) => {
    const newCartItemsCount = newCartItems.reduce(
      (accum, item) => accum + item.quantity,
      0
    );
    const newCartItemsTotalPrice = newCartItems.reduce(
      (accum, item) => accum + item.price * item.quantity,
      0
    );
    const thePayload = {
      cartItems: newCartItems,
      cartCount: newCartItemsCount,
      cartTotalPrice: newCartItemsTotalPrice,
    };
    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, thePayload));
  };

  //! Context Functions
  const addItemToCart = (itemToAdd) => {
    const newCartItems = addCartItem(itemToAdd, cartItems);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (itemToRemove) => {
    const newCartItems = removeCartItem(itemToRemove, cartItems);
    updateCartItemsReducer(newCartItems);
  };

  const deleteItemFromCart = (itemToDelete) => {
    const newCartItems = deleteCartItem(itemToDelete, cartItems);
    updateCartItemsReducer(newCartItems);
  };

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
