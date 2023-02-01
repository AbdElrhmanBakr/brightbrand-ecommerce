import { Routes, Route } from "react-router-dom";
import NavBar from "../routes/NavBar/NavBar";
import Home from "../routes/Home/Home";
import Shop from "../routes/Shop/Shop";
import CheckOut from "../routes/CheckOut/CheckOut";
import Authentication from "../routes/Authentication/Authentication";
import "./App.scss";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<CheckOut />} />
      </Route>
    </Routes>
  );
};

export default App;

//<Route index={true} element={<Home CategoriesData={CategoriesData} />} />;
