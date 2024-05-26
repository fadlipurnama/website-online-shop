import { useSelector } from "react-redux";
import CardCategories from "../Elements/CardCategories";

const CategoriesList = () => {
  const { categories } = useSelector((states) => states.categories);

  return (
    <div className="mx-auto flex max-w-min items-center gap-6">
      {categories &&
        categories.map((category) => (
          <CardCategories
            key={category._id}
            alt={category.name}
            imageUrl={category.imageUrl}
            title={category.name.toUpperCase()}
          />
        ))}
    </div>
  );
};

export default CategoriesList;
