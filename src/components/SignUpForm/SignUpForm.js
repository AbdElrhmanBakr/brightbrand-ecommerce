import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpForm.scss";
import FormInput from "../FormInput/FormInput";
import Button from "../Button/Button";
import { userContext } from "../../context/UserContext";
import {
  createNewAuthUserWithEmailPassWord,
  createNewAuthUser,
} from "../../utils/FireBase/FireBase";

const SignUpForm = () => {
  //! Stats
  const initialVlue = {
    displayName: "",
    email: "",
    passWord: "",
    confirmPassWord: "",
  }; //<-- Initial State

  const [formFields, setFormField] = useState(initialVlue); //<-- Initializing New State
  const { displayName, email, passWord, confirmPassWord } = formFields; //<-- Destructure the State
  const [errorState, setErrorState] = useState(""); // <-- Display error on a span element

  //! Contexts
  const { setCurrentUser } = useContext(userContext);

  //! Functions
  const navigateTo = useNavigate();

  const handeError = (errorData) => {
    setErrorState(errorData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField((prevFormField) => ({ ...prevFormField, [name]: value }));
  };

  const alfterLoggingIn = () => {
    setFormField(initialVlue);
    setErrorState("");
    navigateTo("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (passWord !== confirmPassWord) {
      handeError("Password and Confirmation Do not Match");
      return;
    }
    try {
      const { user } = await createNewAuthUserWithEmailPassWord(
        email,
        passWord
      );
      await createNewAuthUser(user, { displayName });
      setCurrentUser(user);
      alfterLoggingIn();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        handeError("Email already in use.");
      } else {
        console.log("Error", error);
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Don't have an account?</h2>
      <span>Sign Up with Email and PassWord</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          onChange={handleChange}
          name="displayName"
          value={displayName}
          required
        />
        <FormInput
          label="Email"
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
          required
        />
        <FormInput
          label="Password"
          type="password"
          onChange={handleChange}
          name="passWord"
          value={passWord}
          pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
          onInvalid={() =>
            setErrorState(
              "Password must contain at least 1 SpeciaL Character, 1 LowerCase, 1 UpperCase letter and minimum 8 Characters"
            )
          }
          required
        />
        <FormInput
          label="Confirm Password"
          type="password"
          onChange={handleChange}
          name="confirmPassWord"
          value={confirmPassWord}
          required
        />
        <span className="error-msg">{errorState}</span>
        <Button Type="default" type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
