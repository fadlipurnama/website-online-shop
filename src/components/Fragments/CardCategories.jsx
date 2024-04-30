import { useNavigate } from "react-router-dom";

const CardCategories = ({ imageUrl, children, categories }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/${categories}`)}
      className="flex w-40 cursor-pointer flex-col justify-between rounded-lg bg-white p-3 shadow"
    >
      <img src={imageUrl} alt="" className="h-28 w-full rounded-lg bg-black" />
      <h3 className="text-center font-medium">{children}</h3>
    </div>
  );
};

export default CardCategories;
