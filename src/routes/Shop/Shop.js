import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { getDocumentsAndCategories } from "../../utils/FireBase/FireBase";
import CategoriesPreview from "../CategoriesPreview/CategoriesPreview";
import Category from "../Category/Category";
import { setCategories } from "../../store/CategoriesReducer/CategoriesAction";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategories = async () => {
      const categoriesArray = await getDocumentsAndCategories();
      dispatch(setCategories(categoriesArray));
    };
    getCategories();
  }, [dispatch]);

  // Run Only One time in DevMode to add [Data] to out [Database]
  // useEffect(() => {
  //   addCollectionAndDocuments("categories", ProductsData, "title");
  // }, []);
  return (
    // Using [:category] and [useParams] hook --> We can get whatever comes after [/shop/xxxxx] and use it
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
