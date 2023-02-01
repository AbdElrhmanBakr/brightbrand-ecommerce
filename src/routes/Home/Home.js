import Directories from "../../components/Directories/Directories";
import CategoriesData from "../../container/Categories-Data.json";

const Home = () => {
  return <Directories CategoriesData={CategoriesData} />;
};
export default Home;
