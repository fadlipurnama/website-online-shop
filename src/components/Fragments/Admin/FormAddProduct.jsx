import { useEffect } from "react";
import InputForm from "../../Elements/Input";
import SelectForm from "../../Elements/Select";
import TextAreaForm from "../../Elements/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { asyncSetCategories } from "../../../redux/categories/action";
import { useFormRoleAdmin } from "../../../hooks/useFormRoleAdmin";
import { asyncAddProduct } from "../../../redux/products/action";
import Button from "../../Elements/Buttons";
import Checkbox from "../../Elements/Checkbox";

const FormAddProduct = ({ error, message, loading }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((states) => states.categories);
  const [formData, handleChange] = useFormRoleAdmin();
  const {
    name,
    brand,
    price,
    category,
    imageUrl,
    discount,
    best,
    isActive,
    stock,
    rating,
    author,
    description,
  } = formData;

  const handleSubmitProduct = (e) => {
    e.preventDefault();
    dispatch(
      asyncAddProduct({
        name,
        brand,
        best,
        price,
        category,
        imageUrl,
        discount,
        isActive,
        stock,
        description,
        rating,
        author,
      }),
    );
  };

  useEffect(() => {
    dispatch(asyncSetCategories());
  }, [dispatch]);

  return (
    <form
      onSubmit={handleSubmitProduct}
      className={`mb-10 grid grid-cols-3 gap-4 px-10 py-4`}
    >
      <InputForm
        label="Nama Product"
        type="text"
        maxLength={50}
        name="name"
        value={name}
        placeholder="Ketik Nama Product"
        className="text-md rounded py-3"
        disabled={loading}
        onChange={handleChange}
      />
      <InputForm
        label="Nama Brand"
        maxLength={50}
        type="text"
        name="brand"
        value={brand}
        placeholder="Ketik Nama Brand"
        className="text-md rounded py-3"
        disabled={loading}
        onChange={handleChange}
      />
      <InputForm
        label="Harga Produk"
        type="number"
        name="price"
        value={price.toLocaleString("id-ID", {
          styles: "currency",
          currency: "IDR",
        })}
        placeholder="Ketik Jumlah Harga"
        className="text-md rounded py-3"
        disabled={loading}
        onChange={handleChange}
      />
      <InputForm
        label="Stock"
        type="number"
        name="stock"
        value={stock}
        placeholder="Ketik Jumlah Stock"
        className="text-md rounded py-3"
        disabled={loading}
        onChange={handleChange}
      />
      <InputForm
        label="Discount"
        type="number"
        name="discount"
        value={discount}
        placeholder="Ketik Jumlah Stock"
        className="text-md rounded py-3"
        disabled={loading}
        onChange={handleChange}
      />
      <InputForm
        label="Gambar"
        required={true}
        type="file"
        name="imageUrl"
        placeholder="Ketik Masukan Gambar"
        disabled={loading}
        className="text-md rounded bg-white py-3"
        onChange={handleChange}
      />
      <SelectForm
        name="category"
        label="Category"
        disabled={loading}
        options={
          categories &&
          categories.map((category) => ({
            key: category.id,
            label: category.name?.toUpperCase(),
            value: category.name?.toLowerCase(),
          }))
        }
        value={category}
        placeholder="Select an option"
        className="text-md rounded py-3"
        onChange={handleChange}
      />

      <Checkbox
        label="Aktif"
        name="isActive"
        disabled={loading}
        checked={isActive}
        onChange={handleChange}
      />
      <Checkbox
          label="Best Seller"
          disabled={loading}
          name="best"
          checked={best}
          onChange={handleChange}
      />

      <TextAreaForm
        label="Deskripsi Product"
        disabled={loading}
        container="col-span-3"
        name="description"
        placeholder="Ketik Deskripsi Product"
        className="text-md col-span-2 min-h-40 rounded py-3"
        maxLength={400}
        value={description}
        onChange={handleChange}
      />
      {error && (
        <p className="col-span-3 text-center text-red-600">{message}</p>
      )}
      <Button
        disabled={loading}
        type="submit"
        variant="btn-1"
        className="col-span-3 py-3"
      >
        {loading ? "Sedang di prosers..." : "Tambah"}
      </Button>
    </form>
  );
};

export default FormAddProduct;
