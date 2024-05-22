import { useSelector } from "react-redux";
import CardCategories from "../Elements/CardCategories";

const CategoriesList = () => {
  const { categories } = useSelector((states) => states.categories);

  return (
    <div className="m-auto mb-10 hidden max-w-[85%] rounded-lg bg-white px-9 py-4 shadow-lg lg:block">
      <h2 className="mb-5 font-semibold">Categories</h2>
      <div className="mx-auto flex max-w-min items-center gap-6">
        {categories &&
          categories.map((category) => (
            <CardCategories
              key={category._id}
              alt={category.name}
              imageUrl={category.imageUrl}
            >
              {category.name}
            </CardCategories>
          ))}
      </div>
    </div>
  );
};

export default CategoriesList;
