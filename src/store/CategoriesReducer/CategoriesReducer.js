import { CATEGORIES_ACTION_TYPE } from "./CategoriesActionType";

const INITIAL_STATE = {
  categoriesData: {},
};

export const categoriesReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPE.SET_CATEGORIES_DATA:
      return { ...state, categoriesData: payload };
    default:
      return state;
  }
};
