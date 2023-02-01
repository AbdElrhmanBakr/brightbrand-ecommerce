import { useContext } from "react";
import { cartContext } from "../../context/CartContext";
import { ReactComponent as LogoIcon } from "../../assets/shopping-bag.svg";
import "./CartIcon.scss";

const CartIcon = () => {
  const { setDisplayCart, cartCount } = useContext(cartContext);

  const toggleDorpdown = () => {
    setDisplayCart((prevState) => !prevState);
  };

  return (
    <div className="cart-icon-container" onClick={toggleDorpdown}>
      <LogoIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
