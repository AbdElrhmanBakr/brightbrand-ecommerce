import { CATEGORIES_ACTION_TYPE } from "./CategoriesActionType";

const INITIAL_STATE = {
  categoriesArray: [],
};

export const categoriesReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPE.SET_CATEGORIES:
      return { ...state, categoriesArray: payload };
    default:
      return state;
  }
};
