import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputForm from "../../Elements/Input";
import { useFormRoleAdmin } from "../../../hooks/useFormRoleAdmin";
import TextAreaForm from "../../Elements/TextArea";
import SelectForm from "../../Elements/Select";
import { asyncSetCategories } from "../../../redux/categories/action";
import Checkbox from "../../Elements/Checkbox";
import {
  asyncUpdateProductById,
  clearStatusUpdateProductActionCreator,
} from "../../../redux/detailProduct/action";

const FormEditProduct = ({ data, setIsEditModalOpen, status, loading }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((states) => states.categories);
  const [formData, handleChange, setFormData] = useFormRoleAdmin();
  const [isInitialized, setIsInitialized] = useState(false);
  const {
    name,
    brand,
    price,
    category,
    author,
    discount,
    best,
    isActive,
    stock,
    description,
  } = formData;

  useEffect(() => {
    dispatch(asyncSetCategories());
    if (status) {
      setIsEditModalOpen(false);
      dispatch(clearStatusUpdateProductActionCreator());
    }
  }, [dispatch, status, setIsEditModalOpen]);

  useEffect(() => {
    if (data && !isInitialized) {
      setFormData({
        ...formData,
        name: data.name,
        brand: data.brand,
        price: data.price,
        category: data.category,
        discount: data.discount,
        best: data.best,
        isActive: data.isActive,
        stock: data.stock,
        description: data.description,
      });
      setIsInitialized(true);
    }
  }, [data, setFormData, formData, isInitialized]);

  const handleSubmitProduct = (e) => {
    e.preventDefault();
    dispatch(
      asyncUpdateProductById({
        productId: data._id,
        name,
        brand,
        best,
        price,
        category,
        discount,
        isActive,
        stock,
        description,
        author,
      }),
    );
  };
  return (
    <form onSubmit={handleSubmitProduct}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
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
          label="Harga Produk"
          type="number"
          maxLength={50}
          name="price"
          value={price}
          placeholder="Ketik Harga Product"
          className="text-md rounded py-3"
          onChange={handleChange}
          disabled={loading}
        />
        <InputForm
          label="Merek Produk"
          type="text"
          maxLength={50}
          name="brand"
          value={brand}
          placeholder="Ketik Harga Product"
          className="text-md rounded py-3"
          onChange={handleChange}
          disabled={loading}
        />
        <InputForm
          label="Jumlah Discount"
          type="number"
          maxLength={50}
          name="discount"
          value={discount}
          placeholder="Ketik Jumlah Discount"
          className="text-md rounded py-3"
          onChange={handleChange}
          disabled={loading}
        />

        <SelectForm
          name="category"
          label="Category"
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
          disabled={loading}
          onChange={handleChange}
        />
        <InputForm
          label="Jumlah Stock"
          type="text"
          name="stock"
          value={stock}
          placeholder="Ketik Jumlah Stock"
          className="text-md rounded py-3"
          onChange={handleChange}
          disabled={loading}
        />
        <Checkbox
          label="Status Product Aktif"
          name="isActive"
          checked={isActive}
          onChange={handleChange}
          disabled={loading}
        />
        <Checkbox
          label="Best Seller"
          name="best"
          checked={best}
          onChange={handleChange}
          disabled={loading}
        />
        <TextAreaForm
          label="Deskripsi"
          container="col-span-2"
          type="text"
          maxLength={400}
          name="description"
          value={description}
          placeholder="Ketik Deskripsi"
          className="text-md ounded h-40 py-3"
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          className="mr-2 rounded-lg bg-gray-500 px-4 py-2 text-white shadow-md transition duration-200 ease-in-out hover:bg-gray-600"
          onClick={() => setIsEditModalOpen(false)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white shadow-md transition duration-200 ease-in-out hover:bg-blue-700"
          disabled={loading}
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default FormEditProduct;
