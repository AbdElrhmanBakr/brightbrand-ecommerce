import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { signOutUser } from "../../utils/FireBase/FireBase";
import { userContext } from "../../context/UserContext";
import { cartContext } from "../../context/CartContext";
import CartIcon from "../../components/CartIcon/CartIcon";
import CartDropdown from "../../components/CartDropdown/CartDropdown";
import NavLogo from "../../assets/BrightBrand-C.png";
import "./NavBar.scss";

const NavBar = () => {
  const { currentUser } = useContext(userContext);
  const { displayCart } = useContext(cartContext);

  return (
    <Fragment>
      <nav className="nav-bar">
        <Link className="nav-logo-container" to="/">
          <img src={NavLogo} alt="NavLogo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/">
            HOME
          </Link>
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {displayCart && <CartDropdown />}
      </nav>
      <Outlet />
    </Fragment>
  );
};

export default NavBar;
