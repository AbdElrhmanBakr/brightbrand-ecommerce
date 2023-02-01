import { createContext, useState, useEffect } from "react";
import { getDocumentsAndCategories } from "../utils/FireBase/FireBase";

// Import Only One time in DevMode to add [Data] to out [Database]
// import ProductsData from "../container/Products-Data";
// import { addCollectionAndDocuments } from "../utils/FireBase/FireBase";

//!Context
export const categoriesContext = createContext({
  products: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState({});

  useEffect(() => {
    const getCategories = async () => {
      const categoriesData = await getDocumentsAndCategories();
      setCategories(categoriesData);
    };
    getCategories();
  }, []);

  // Run Only One time in DevMode to add [Data] to out [Database]
  // useEffect(() => {
  //   addCollectionAndDocuments("categories", ProductsData, "title");
  // }, []);

  //!Context Value
  const value = { categories };

  return (
    <categoriesContext.Provider value={value}>
      {children}
    </categoriesContext.Provider>
  );
};
