import SignInForm from "../../components/SignInForm/SignInForm";
import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  signInWithFacebookPopup,
  signInWithFacebookRedirect,
  createNewAuthUser,
} from "../../utils/FireBase/FireBase";

const SignIn = () => {
  //* Google Sign IN Using Popup Method
  const googlePopupSignIn = async () => {
    const { user } = await signInWithGooglePopup();
    await createNewAuthUser(user);
  };

  //* FaceBook Sign IN Using Popup Method
  const facebookPopupSignIn = async () => {
    const { user } = await signInWithFacebookPopup();
    await createNewAuthUser(user);
  };

  //* Google Sign IN Using Rdirect Method
  useEffect(() => {
    const googleRedirectSignIn = async () => {
      const response = await getRedirectResult(auth);
      if (response) {
        await createNewAuthUser(response.user);
      }
    };
    googleRedirectSignIn();
  }, []);

  //* FaceBook Sign IN Using Rdirect Method
  useEffect(() => {
    const facebookRedirectSignIn = async () => {
      const response = await getRedirectResult(auth);
      if (response) {
        await createNewAuthUser(response.user);
      }
    };
    facebookRedirectSignIn();
  }, []);
  return (
    <div>
      <h1>SignIn</h1>
      <SignInForm />
      <button onClick={googlePopupSignIn}> googlePopupSignIn </button>
      <button onClick={signInWithGoogleRedirect}> googleRedirectSignIn </button>
      <button onClick={facebookPopupSignIn}> facebookPopupSignIn </button>
      <button onClick={signInWithFacebookRedirect}>
        facebookRedirectSignIn
      </button>
    </div>
  );
};
export default SignIn;
