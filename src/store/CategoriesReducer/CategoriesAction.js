import { CATEGORIES_ACTION_TYPE } from "./CategoriesActionType";
import { createAction } from "../../utils/Reducer/Reducer";

export const setCategoriesData = (categoriesData) =>
  createAction(CATEGORIES_ACTION_TYPE.SET_CATEGORIES_DATA, categoriesData);
