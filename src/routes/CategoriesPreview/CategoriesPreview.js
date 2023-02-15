import { Fragment } from "react";
import { useSelector } from "react-redux";
import { selectCategoriesData } from "../../store/CategoriesReducer/CategoriesSelector";
import CategoryPreview from "../../components/CategoryPreview/CategoryPreview";

const CategoriesPreview = () => {
  const categories = useSelector(selectCategoriesData);

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
