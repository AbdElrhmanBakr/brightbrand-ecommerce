import { CATEGORIES_ACTION_TYPE } from "./CategoriesActionType";

//! Reducers Initial State
const INITIAL_STATE = {
  categoriesArray: [],
};

//! Reducer Function
// Every Single [All] Reducer receives the actions passed to any one.
export const categoriesReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPE.SET_CATEGORIES:
      return { ...state, categoriesArray: payload };
    default:
      return state;
  }
};
