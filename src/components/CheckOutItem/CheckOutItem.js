import "./CheckOutItem.scss";
import { useContext } from "react";
import { cartContext } from "../../context/CartContext";

const CheckoutItem = ({ item }) => {
  const { name, imageUrl, price, quantity } = item;
  const { addItemToCart, removeItemFromCart, deleteItemFromCart } =
    useContext(cartContext);

  const addItem = () => addItemToCart(item);
  const removeItem = () => removeItemFromCart(item);
  const deleteItem = () => deleteItemFromCart(item);
  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeItem}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItem}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={deleteItem}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
