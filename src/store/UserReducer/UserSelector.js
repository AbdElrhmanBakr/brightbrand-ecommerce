//! The use of the selector is to transform data and use it in many different types, and select it from the store state.
//! but the use of the reducer is to store the data in the most basic form you get from api or firebase which is []

// useSelector receive the entire state from redux
// The component that import the Selector rerender, If the selector return different value.
//Whenever the Redux Store changes due to any of the individual reducers updates the Redux Store,
//Every single useSelector will fire, as useSelector is hooked into Redux Store
//If the return of the selector changes, the component rerenders
export const selectCurrentUser = (state) => state.user.currentUser;
