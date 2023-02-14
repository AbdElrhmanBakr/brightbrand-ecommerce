import { useReducer, createContext, useEffect } from "react";
import { createAction } from "../utils/Reducer/Reducer";
import {
  onAuthStateChangedListener,
  createNewAuthUser,
} from "../utils/FireBase/FireBase";

// Context    --> It's a special way to share values with a parent component to deeply nested children.
// useReducer --> It's a way of managing React state with pure functions that transform state.
export const userContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

//! Reducers Actions Object
export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

//! Reducer Function
// The reducer function that specifies how the state gets updated.
// It must be pure, should take the state and action as arguments,
// and should return the next state. State and action can be of any types.
// Whenever this function runs. State object produced and component function re-renders.
const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    default:
      throw new Error(`Unknown Type ${type} in userReducer`);
  }
};

//! Reducers Initial State
const INITIAL_STATE = {
  currentUser: null,
};

export const UserProvider = ({ children }) => {
  //! Reducer Hook
  // Accepts a Rdeucer Function as First Param, and Initial State as Second one.
  // Return Array [currentStateValue,dispatchFunction]
  // dispatchFunction --> Can pass an action to it and later invoke it, Trigger a re-render
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const { currentUser } = state;

  // Invoking setCurrentUser --> Leads to Invoking dispatchFunction and trigger a Re-render.
  // as Passing the action object to reducerFunction --> Leads to Update the userState.
  const setCurrentUser = (user) => {
    // const action = { type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user };

    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  };

  const value = { currentUser, setCurrentUser };

  // Using onAuthStateChanged to replace all setCurrentUser and useContext
  // in SignUpForm and SignInForm Components
  useEffect(() => {
    // Altough useEffect renders only Once, but This function is passed to [onAuthStateChanged] in Firebase
    // so that every time auth changed by user => [onAuthStateChanged] will call it and pass user to it as a Listener
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createNewAuthUser(user);
      }
      setCurrentUser(user);
    });

    // [onAuthStateChanged] returns a method to clean up the Listener by using the return from it
    // and pass it to the [useEffect] return that used to clean up side effect of [useEffect]
    return () => unsubscribe;
  }, []);

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};
