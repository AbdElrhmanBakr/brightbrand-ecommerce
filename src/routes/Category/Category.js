import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { categoriesContext } from "../../context/CategoriesContext";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Category.scss";

const Category = () => {
  const { categories } = useContext(categoriesContext);
  const { category } = useParams();
  const [products, setProducts] = useState(categories[category]);
  const navigateTo = useNavigate();

  const returnToHome = () => navigateTo("/shop");

  useEffect(() => {
    setProducts(categories[category]);
  }, [categories, category]);

  return (
    // Will Protect the renders using [Products] because category gets its data in [categoriesContext] asyncrounaslly
    // Means renders starts before categories gets the data from [Database], and products in [useEffect] is set to undefined
    // so With products, We only renders only when products is set to a valid Data when [categories] gets its Data.
    <section className="category-container">
      <h2>
        <span className="category-title not-clicked">
          {category.toUpperCase()}
        </span>
        <span className="category-title" onClick={returnToHome}>
          RETURN
        </span>
      </h2>
      <div className="category-products-container">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </section>
  );
};

export default Category;
