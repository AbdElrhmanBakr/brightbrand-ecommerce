import { Fragment } from "react";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/CategoriesReducer/CategoriesSelector";
import CategoryPreview from "../../components/CategoryPreview/CategoryPreview";

const CategoriesPreview = () => {
  //Whenever the Redux Store changes due to any of the individual reducers updates the Redux Store,
  //Every single useSelector will fire, as useSelector is hooked into Redux Store
  //If the return of the selector changes, the component rerenders
  const categories = useSelector(selectCategoriesMap);

  return (
    <Fragment>
      {Object.keys(categories).map((title, index) => {
        return (
          <CategoryPreview
            key={index}
            title={title}
            products={categories[title]}
          />
        );
      })}
    </Fragment>
  );
};
export default CategoriesPreview;
