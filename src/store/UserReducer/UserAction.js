import { createAction } from "../../utils/Reducer/Reducer";
import { USER_ACTION_TYPES } from "./UserActionType";

//! Return Action Object using [createAction] Util
export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
