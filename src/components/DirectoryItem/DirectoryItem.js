import "./DirectoryItem.scss";
import { useNavigate } from "react-router-dom";

const DirectoryItem = ({ category }) => {
  const { name, img } = category;

  const navigateTo = useNavigate();

  const handleClickNavigate = () => {
    navigateTo(`/shop/${name}`);
  };

  return (
    <div className="directory-item-container" onClick={handleClickNavigate}>
      <img className="directory-item-img" src={`../assets/${img}`} alt={name} />
      <div className="directory-item-body">
        <h2>{name.toUpperCase()}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default DirectoryItem;

// --> Nested Destructuring
// const DirectoryItem = ({ category: { id, name, img } }) => {
