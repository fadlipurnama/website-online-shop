import { useNavigate } from "react-router-dom";

const CardCategories = ({ imageUrl, children, categories }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/${categories}`)}
      className="w-40 p-3 cursor-pointer bg-white rounded-lg shadow flex flex-col justify-between"
    >
      <img src={imageUrl} alt="" className="bg-black w-full h-28 rounded-lg" />
      <h3 className="text-center font-medium">{children}</h3>
    </div>
  );
};

export default CardCategories;
