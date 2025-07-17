import { compose, applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";
import logger from "redux-logger";

import { rootReducer } from "./RootReducer";

//! MiddleWare Details
// First --> We pass the store to the middleWare.
// Second --> We pass the [next] Method that when we call it, it pass the action to whatever next to it.
// Third --> We pass the action itself that will be passed to the rducers by the [next] Method.
const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }
  console.log("action: ", action);
  console.log("currentState: ", store.getState());
  next(action);
  console.log("nextState: ", store.getState());
};

const middlewares = [loggerMiddleware];

// Run before Action hit reducer, When using dispatch, action hit middlewares before reducer
// const middlewares = [logger];

const composedEnhancers = compose(applyMiddleware(...middlewares));

// undefined --> additional state if needed
//Whenever the Redux Store changes due to any of the individual reducers updates the Redux Store,
//Every single useSelector will fire, as useSelector is hooked into Redux Store
//If the return of the selector changes, the component rerenders
export const Store = createStore(rootReducer, undefined, composedEnhancers);

// Store Produce Object State used in [index.js] with [Provider]
