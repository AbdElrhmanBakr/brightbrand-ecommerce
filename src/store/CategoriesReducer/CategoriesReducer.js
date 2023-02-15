import { CATEGORIES_ACTION_TYPE } from "./CategoriesActionType";

const INITIAL_STATE = {
  categories: [],
};

export const categoriesReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPE.SET_CATEGORIES:
      return { ...state, categories: payload };
    default:
      return state;
  }
};
