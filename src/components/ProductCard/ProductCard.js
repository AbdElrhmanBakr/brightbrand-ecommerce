import "./ProductCard.scss";
import Button from "../Button/Button";
import { useContext } from "react";
import { cartContext } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const { name, imageUrl, price } = product;
  const { addItemToCart } = useContext(cartContext);

  const addProductToCart = () => addItemToCart(product);

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button Type="inverted" onClick={addProductToCart}>
        ADD TO CART
      </Button>
    </div>
  );
};

export default ProductCard;
