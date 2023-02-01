import "./Button.scss";

const Button = ({ children, Type, ...otherProps }) => {
  const ButtonType = {
    default: "",
    google: "google-sign-in",
    facebook: "facebook-sign-in",
    inverted: "inverted",
  };
  return (
    <button className={`button-container ${ButtonType[Type]}`} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
