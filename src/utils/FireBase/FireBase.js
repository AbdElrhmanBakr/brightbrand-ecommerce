// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDz3lIBXKNrMp85uFpbYGpMdyY--8LPNH0",
  authDomain: "myreact-ecommerce.firebaseapp.com",
  projectId: "myreact-ecommerce",
  storageBucket: "myreact-ecommerce.appspot.com",
  messagingSenderId: "434751802393",
  appId: "1:434751802393:web:3c23f1f31e0ba52da2ee88",
}; // <-- Your web app's Firebase configuration

const app = initializeApp(firebaseConfig); // <-- Initialize Firebase

const provider = new GoogleAuthProvider(); // <-- Create an instance of the Google provider object
provider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGooglePopup = () => signInWithPopup(auth, provider); // <-- Sign in with a Google pop-up window

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider); // <-- Sign by Google redirecting to the sign-in page

const provider2 = new FacebookAuthProvider(); // <-- Create an instance of the Facebbok provider object
provider.setCustomParameters({
  display: "popup",
});

export const signInWithFacebookPopup = () => signInWithPopup(auth, provider2); // <--Sign in with a Google pop-up window

export const signInWithFacebookRedirect = () =>
  signInWithRedirect(auth, provider2); // <-- Sign by Google redirecting to the sign-in page

// Initialize Firebase Authentication and get a reference to the service
// const auth1 = getAuth(); // or getAuth(app), uses app1 as it's default,
export const auth = getAuth(app);

const db = getFirestore(app); // <--Initialize Cloud Firestore and get a reference to the service

// Create New document for each Object inside ObjectToAdd and refer it to the Collection Created
// Used Once to Add Data in [Products-Data.js] in container to the [Database]
export const addCollectionAndDocuments = async (
  collectionNameToAdd,
  objectsToAdd,
  titleField
) => {
  const collectionRef = collection(db, collectionNameToAdd); //<-- Refer to the New [Collection] inside the [DataBase]
  const batch = writeBatch(db); // <--Initialize the batch so that we can add [Data] to [database]

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object[titleField].toLowerCase()); // object[titleField] <-- each object title in [Products-Data.js]
    batch.set(docRef, object); //<-- Set each [Object] to its [document] inside [Collection] inside [Database]
  });
  await batch.commit();
  console.log("Done Uploading Data to Database");
};

export const getDocumentsAndCategories = async () => {
  const collectionRef = collection(db, "categories");
  const querySnapshot = await getDocs(collectionRef);
  const CategoriesArray = querySnapshot.docs.map((doc) => doc.data());
  return CategoriesArray;

  // --> Must use [docs] as [querySnapshot] is an Object includes Categories Array <-- //
  // const categoriesObject = querySnapshot.docs.reduce((accum, doc) => {
  //   const { title, items } = doc.data();
  //   accum[title.toLowerCase()] = items;
  //   return accum;
  // }, {});
  // return categoriesObject;
};

export const createNewAuthUser = async (user, additionalData = {}) => {
  if (!user) return;
  // users --> Collection, doc --> Document
  // the userRef is the document in somewhere inside the database, but not displayed yet in it.
  const userRef = doc(db, "users", user.uid);
  const userSnapshot = await getDoc(userRef);
  // .exist() --> return true if the user exists inside the users collection in the DB.
  // Check if the user already ex
  if (!userSnapshot.exists()) {
    // get data from --> signInWithGooglePopup() [Method] that passed user from SignIn.js [Route].
    const { displayName, email } = user;
    const createdAt = new Date();
    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log(error);
    }
  }
  return userRef;
};

export const createNewAuthUserWithEmailPassWord = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}; // <-- Imported in SignUpForm Component

export const signInNewAuthUserWithEmailPassWord = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}; // <-- Imported in SignInForm Component

export const signOutUser = async () => signOut(auth); // <-- Imported in NavBar Route

// Imported in UserDataContext ContextComponent
// onAuthStateChanged pass user who changed the auth state to that callback function
export const onAuthStateChangedListener = async (callback) => {
  onAuthStateChanged(auth, callback);
};
