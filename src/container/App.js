import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Routes, Route } from "react-router-dom";

import {
  onAuthStateChangedListener,
  createNewAuthUser,
} from "../utils/FireBase/FireBase";
import NavBar from "../routes/NavBar/NavBar";
import Home from "../routes/Home/Home";
import Shop from "../routes/Shop/Shop";
import CheckOut from "../routes/CheckOut/CheckOut";
import Authentication from "../routes/Authentication/Authentication";
import { setCurrentUser } from "../store/UserReducer/UserAction";
import "./App.scss";

const App = () => {
  const dispatch = useDispatch();

  //! Removing dispatch from dependency Array case Warning
  //  as useEffect considers dispatch might change, but it'll never do so.
  //  So removing it or adding is the same
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createNewAuthUser(user);
      }
      dispatch(setCurrentUser(user));
    });

    return () => unsubscribe;
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<CheckOut />} />
      </Route>
    </Routes>
  );
};

export default App;

//<Route index={true} element={<Home CategoriesData={CategoriesData} />} />;
