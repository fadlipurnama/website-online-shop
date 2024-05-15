import { useEffect } from "react";
import InputForm from "../Elements/Input";
import SelectForm from "../Elements/Select";
import TextAreaForm from "../Elements/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { asyncSetCategories } from "../../redux/categories/action";
import { useFormRoleAdmin } from "../../hooks/useFormRoleAdmin";

const FormAddProduct = () => {
  const dispatch = useDispatch();
  const [formData, handleChange] = useFormRoleAdmin();
  const { categories } = useSelector((states) => states.categories);
  const {
    name,
    brand,
    price,
    category,
    imageUrl,
    rating,
    promo,
    isActive,
    stock,
    description,
  } = formData;

  const handleSubmitProduct = (e) => {
    e.preventDefault();
    // dispatch(async(email, password));
  };

  useEffect(() => {
    dispatch(asyncSetCategories());
  }, [dispatch]);
  return (
    <form
      onSubmit={handleSubmitProduct}
      className="grid grid-cols-2 gap-4 py-4"
    >
      <InputForm
        label="Nama Product"
        type="text"
        name="name"
        placeholder="Ketik Nama Product"
        className="text-md rounded py-3"
        onChange={handleChange}
      />
      <InputForm
        label="Nama Brand"
        type="text"
        name="brand"
        placeholder="Ketik Nama Brand"
        className="text-md rounded py-3"
        onChange={handleChange}
      />
      <InputForm
        label="Harga"
        type="number"
        name="price"
        placeholder="Ketik Nama Brand"
        className="text-md rounded py-3"
        onChange={handleChange}
      />
      <InputForm
        label="Stock"
        type="number"
        name="stock"
        placeholder="Ketik Jumlah Stock"
        className="text-md rounded py-3"
        onChange={handleChange}
      />
      <InputForm
        label="Gambar"
        type="file"
        name="stock"
        placeholder="Ketik Masukan Gambar"
        className="text-md rounded py-3"
        onChange={handleChange}
      />
      <SelectForm
        name="category"
        label="Category"
        options={categories?.map((category) => ({
          key: category.id,
          label: category.name.toUpperCase(),
          value: category.name.toLowerCase(),
        }))}
        placeholder="Select an option"
        required={true}
        className="text-md rounded py-3"
        onChange={handleChange}
      />
      <TextAreaForm
        container="col-span-2"
        label="Deskripsi Product"
        name="description"
        placeholder="Ketik Deskripsi Product"
        className="text-md col-span-2 min-h-40 rounded py-3"
        onChange={handleChange}
      />
    </form>
  );
};

export default FormAddProduct;
