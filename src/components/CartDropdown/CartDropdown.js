import { useNavigate } from "react-router-dom";
import "./CartDropdown.scss";
import Button from "../Button/Button";
import CartItem from "../CartItem/CartItem";
import { useContext } from "react";
import { cartContext } from "../../context/CartContext";

const CartDropdown = () => {
  const { cartItems, setDisplayCart } = useContext(cartContext);
  const navigateTo = useNavigate();

  const handleCheckOutClick = () => {
    navigateTo("/checkout");
    setDisplayCart(false);
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <Button onClick={handleCheckOutClick}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
