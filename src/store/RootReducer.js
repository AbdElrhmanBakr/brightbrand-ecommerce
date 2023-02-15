import { combineReducers } from "redux";

//! Single Reducers
import { userReducer } from "./UserReducer/UserReducer";
import { categoriesReducer } from "./CategoriesReducer/CategoriesReducer";

//! Root Reducer
export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
});
