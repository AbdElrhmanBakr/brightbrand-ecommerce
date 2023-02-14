import { combineReducers } from "redux";

//! Single Reducers
import { userReducer } from "./UserReducer/UserReducer";

//! Root Reducer
export const rootReducer = combineReducers({
  user: userReducer,
});
