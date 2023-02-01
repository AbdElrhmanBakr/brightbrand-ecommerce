import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import "./CategoryPreview.scss";

const CategoryPreview = ({ title, products }) => {
  return (
    <div className="category-preview-container">
      <h2>
        <Link to={title} className="category-preview-title">
          {title.toUpperCase()}
        </Link>
      </h2>
      <div className="category-preview">
        {products
          .filter((_, index) => index < 4)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
