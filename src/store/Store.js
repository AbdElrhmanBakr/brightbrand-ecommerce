import { compose, applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";
import logger from "redux-logger";

import { rootReducer } from "./RootReducer";

// Run before Action hit reducer, When using dispatch, action hit middlewares before reducer
const middlewares = [logger];

const composedEnhancers = compose(applyMiddleware(...middlewares));

// undefined --> additional state if needed
export const Store = createStore(rootReducer, undefined, composedEnhancers);

// Store Produce Object State used in [index.js] with [Provider]
