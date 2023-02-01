import { useContext, Fragment } from "react";
import { categoriesContext } from "../../context/CategoriesContext";
import CategoryPreview from "../../components/CategoryPreview/CategoryPreview";

const CategoriesPreview = () => {
  const { categories } = useContext(categoriesContext);

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
