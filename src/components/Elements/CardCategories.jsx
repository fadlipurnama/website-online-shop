import { useNavigate } from "react-router-dom";
import LazyImage from "./LazyImage";

const CardCategories = ({ imageUrl, title, alt }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/products/${title.toLowerCase()}`)}
      className="group flex w-40 cursor-pointer flex-col justify-between gap-4 rounded-lg bg-white p-3 text-gray-800 shadow   hover:bg-slate-200"
    >
      <LazyImage
        src={imageUrl}
        alt={alt}
        className="h-28 w-full rounded-lg bg-black"
      />
      <h3 className="text-center font-medium group-hover:font-bold">{title}</h3>
    </div>
  );
};

export default CardCategories;
