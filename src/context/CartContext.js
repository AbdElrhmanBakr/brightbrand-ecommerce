import { createContext, useEffect, useReducer } from "react";

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
  SET_CART_COUNT: "SET_CART_COUNT",
  SET_TOTAL_PRICE: "SET_TOTAL_PRICE",
};

//! Reducers Function
const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_CART_DISPLAY":
      return { ...state, displayCart: payload };
    case "SET_CART_ITEMS":
      return { ...state, cartItems: payload };
    case "SET_CART_COUNT":
      return { ...state, cartCount: payload };
    case "SET_TOTAL_PRICE":
      return { ...state, cartTotalPrice: payload };
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
  //! Stats
  // const [displayCart, setDisplayCart] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [cartCount, setCartCount] = useState(0);
  // const [cartTotalPrice, setCartTotalPrice] = useState(0);

  //! Reducers
  //Replacing all states in Initial State
  //All setStates --> With new Functions that trigger the dispatch
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { displayCart, cartItems, cartCount, cartTotalPrice } = state;

  const setDisplayCart = () => {
    const action = {
      type: CART_ACTION_TYPES.SET_CART_DISPLAY,
      payload: !displayCart,
    };
    dispatch(action);
  };

  //! Reducers Functions
  const setCartItems = (ItemsObject) => {
    const action = {
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: ItemsObject,
    };
    dispatch(action);
  };

  const setCartCount = (count) => {
    const action = { type: CART_ACTION_TYPES.SET_CART_COUNT, payload: count };
    dispatch(action);
  };

  const setCartTotalPrice = (totalPrice) => {
    const action = {
      type: CART_ACTION_TYPES.SET_TOTAL_PRICE,
      payload: totalPrice,
    };
    dispatch(action);
  };

  //! Context Functions
  const addItemToCart = (itemToAdd) => {
    setCartItems(addCartItem(itemToAdd, cartItems));
  };

  const removeItemFromCart = (itemToRemove) => {
    setCartItems(removeCartItem(itemToRemove, cartItems));
  };

  const deleteItemFromCart = (itemToDelete) => {
    setCartItems(deleteCartItem(itemToDelete, cartItems));
  };

  //! useEffects Hook
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
