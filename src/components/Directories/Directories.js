import DirectoryItem from "../DirectoryItem/DirectoryItem";
import "./Directories.scss";

const Directory = ({ CategoriesData }) => {
  return (
    <main className="directory">
      {CategoriesData.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </main>
  );
};

export default Directory;
