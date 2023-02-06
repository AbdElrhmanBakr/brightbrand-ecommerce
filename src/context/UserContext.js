import { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListener,
  createNewAuthUser,
} from "../utils/FireBase/FireBase";

export const userContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
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
