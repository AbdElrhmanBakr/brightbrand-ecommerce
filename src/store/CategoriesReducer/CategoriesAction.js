import { CATEGORIES_ACTION_TYPE } from "./CategoriesActionType";
import { createAction } from "../../utils/Reducer/Reducer";

export const setCategories = (categoriesArray) =>
  createAction(CATEGORIES_ACTION_TYPE.SET_CATEGORIES, categoriesArray);
