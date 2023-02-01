import "./CheckOut.scss";
import Button from "../../components/Button/Button";
import { useContext } from "react";
import { cartContext } from "../../context/CartContext";
import CheckOutItem from "../../components/CheckOutItem/CheckOutItem";

const CheckOut = () => {
  const { cartItems } = useContext(cartContext);
  const { cartTotalPrice, deleteItemFromCart } = useContext(cartContext);

  const clearCart = () => deleteItemFromCart(cartItems);

  const headerBlock = ["Product", "Description", "Quantity", "Price", "Remove"];
  return (
    <div className="checkout-container">
      <div className="checkout-header">
        {headerBlock.map((header, index) => (
          <div key={index} className="header-block">
            {header}
          </div>
        ))}
      </div>
      {cartItems.map((item) => (
        <CheckOutItem key={item.id} item={item} />
      ))}
      <div className="checkout-data">
        {cartItems.length > 0 && (
          <Button Type="default" onClick={clearCart}>
            Clear All
          </Button>
        )}
        <span className="total">Total Price: {cartTotalPrice}$</span>
      </div>
    </div>
  );
};

export default CheckOut;
