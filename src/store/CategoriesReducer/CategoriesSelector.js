// Looping over Categories Array and convert it to Object using [.reduce].
// The component that import the Selector rerender, If the selector return different value.
// And in here the accum always returns a new object even if [categoriesArray] doesn't changle,
// It will always return a new object from the memory, So It's component always rerenders.
export const selectCategoriesMap = (state) =>
  state.categories.categoriesArray.reduce((accum, category) => {
    const { title, items } = category;
    accum[title.toLowerCase()] = items;
    return accum;
  }, {});
