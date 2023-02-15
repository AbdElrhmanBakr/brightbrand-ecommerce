// Looping over Categories Array and convert it to Object using [.reduce]
export const selectCategoriesMap = (state) =>
  state.categories.categories.reduce((accum, category) => {
    const { title, items } = category;
    accum[title.toLowerCase()] = items;
    return accum;
  }, {});
