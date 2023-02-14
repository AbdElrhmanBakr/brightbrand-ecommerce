import { USER_ACTION_TYPES } from "./UserActionType";

//! Reducers Initial State
const INITIAL_STATE = {
  currentUser: null,
};

//! Reducer Function
export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    default:
      return state;
  }
};
