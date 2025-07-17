import { combineReducers } from "redux";

//! Single Reducers
import { userReducer } from "./UserReducer/UserReducer";
import { categoriesReducer } from "./CategoriesReducer/CategoriesReducer";

//! Root Reducer
export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
});

  //Whenever the Redux Store changes due to any of the individual reducers updates the Redux Store,
  //Every single useSelector will fire, as useSelector is hooked into Redux Store
  //If the return of the selector changes, the component rerenders

//Selectors used with useSelector or mapState will be re-run after every dispatched action,
//regardless of what section of the Redux root state was actually updated.
//Re-running expensive calculations when the input state sections didn't change is a waste of CPU time,
//and it's very likely that the inputs won't have changed most of the time anyway.

//useSelector and mapState rely on === reference equality checks of the return values to determine if the component needs to re-render.
//If a selector always returns new references, it will force the component to re-render even if the derived data is effectively the same as last time.
//This is especially common with array operations like map() and filter(), which return new array references.
