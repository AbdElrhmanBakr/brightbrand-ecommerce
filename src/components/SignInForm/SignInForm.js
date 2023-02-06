import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../context/UserContext"; //<-- General Storage
import {
  signInWithGooglePopup,
  signInWithFacebookPopup,
  signInNewAuthUserWithEmailPassWord,
  createNewAuthUser,
} from "../../utils/FireBase/FireBase";
import Button from "../Button/Button"; //<-- General Button Component
import FormInput from "../FormInput/FormInput";
import "./SignInForm.scss";

const SignInForm = () => {
  //! Stats
  const initialVlue = {
    email: "",
    passWord: "",
  }; //<-- Initial State

  const [formFields, setFormField] = useState(initialVlue); //<-- Initializing New State for Input Fields
  const { email, passWord } = formFields; //<-- Destructure the State
  const [errorState, setErrorState] = useState(""); // <-- SignIn Error State for [Span]
  const [socialErrorState, setSocialErrorState] = useState(""); // <-- [SocialMedia] SignIn Error State for [Span]

  //! Contexts
  const { setCurrentUser } = useContext(userContext);

  //! Functions
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField((prevFormField) => ({ ...prevFormField, [name]: value }));
  };

  const navigateTo = useNavigate(); // <-- React Router DOM Hook to Navigate to [Home] After LoggingIn

  const alfterLoggingIn = () => {
    setFormField(initialVlue);
    setErrorState("");
    setSocialErrorState("");
    navigateTo("/"); // <-- Go to Home after Logging In
  };

  // 2 Functions to Display Error Messages on the [Span]
  const handeError = (errorData) => {
    setErrorState(errorData);
  };
  const handeSocialError = (SocialErrorData) => {
    setSocialErrorState(SocialErrorData);
  };

  //* Sign IN Using Email and Password
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { user } = await signInNewAuthUserWithEmailPassWord(
        email,
        passWord
      );
      setCurrentUser(user);
      alfterLoggingIn();
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        handeError("Wrong PassWord for the Email");
      } else if (error.code === "auth/user-not-found") {
        handeError("You are not a user.");
      } else {
        console.log("Error", error);
      }
    }
  };

  //* Google Sign IN Using Popup Method
  const googlePopupSignIn = async () => {
    const { user } = await signInWithGooglePopup();
    await createNewAuthUser(user);
    setCurrentUser(user);
    alfterLoggingIn();
  };

  //* FaceBook Sign IN Using Popup Method
  const facebookPopupSignIn = async () => {
    try {
      const { user } = await signInWithFacebookPopup();
      await createNewAuthUser(user);
      setCurrentUser(user);
      alfterLoggingIn();
    } catch (error) {
      if ((error.code = "auth/account-exists-with-different-credential")) {
        handeSocialError(
          "You already signed in with same email using different method."
        );
      } else {
        console.log("Error:", error);
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Has an account?</h2>
      <span>Sign In with Email and PassWord</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
          required
        />
        <FormInput
          label="PassWord"
          type="password"
          onChange={handleChange}
          name="passWord"
          value={passWord}
          required
        />
        <span className="error-msg">{errorState}</span>
        <Button Type="default" type="submit">
          Sign In
        </Button>
      </form>

      <span className="signin-head">Or Sign In with</span>
      <span className="error-msg">{socialErrorState}</span>

      <div className="btns-container">
        <Button Type="google" type="button" onClick={googlePopupSignIn}>
          Google SignIn
        </Button>
        <Button Type="facebook" type="button" onClick={facebookPopupSignIn}>
          Facebook SignIn
        </Button>
      </div>
    </div>
  );
};

export default SignInForm;
