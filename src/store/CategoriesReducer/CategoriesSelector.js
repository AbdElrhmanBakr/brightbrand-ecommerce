//! The use of the selector is to transform data and use it in many different types, and select it from the store state.
//! but the use of the reducer is to store the data in the most basic form you get from api or firebase which is []

// Looping over Categories Array and convert it to Object using [.reduce].
// The component that import the Selector rerender, If the selector return different value.
// And in here the accum always returns a new object even if [categoriesArray] doesn't change,
// It will always return a new object from the memory, So It's component always rerenders.

export const selectCategoriesMap = (state) =>
  state.categories.categoriesArray.reduce((accum, category) => {
    const { title, items } = category;
    accum[title.toLowerCase()] = items;
    return accum;
  }, {});
