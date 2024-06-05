import { useEffect, useState } from "react";
import InputForm from "../../Elements/Input";
// import SelectForm from "../../Elements/Select";
import TextAreaForm from "../../Elements/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { asyncSetCategories } from "../../../redux/categories/action";
import { useFormRoleAdmin } from "../../../hooks/useFormRoleAdmin";
import { asyncAddProduct } from "../../../redux/products/action";
import Button from "../../Elements/Button";
import Checkbox from "../../Elements/Checkbox";
import SelectForm from "../../Elements/Select";
import { asyncSetBanners } from "../../../redux/banners/action";
import { z } from "zod";

const FormAddProduct = ({ loading }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const { categories } = useSelector((states) => states.categories);
  const { banners } = useSelector((states) => states.banners);
  const { formData, handleChange } = useFormRoleAdmin();
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
    description,
    labelPromo,
    netWeight,
    serialNumber,
    ratedVoltage,
  } = formData;

  const formDataSchema = z.object({
    name: z.string().min(1, "*Masukkan nama produk"),
    brand: z.string().min(1, "*Masukkan nama brand produk"),
    price: z.string().min(1, "*Masukkan nominal harga produk"),
    category: z.string().min(1, "*Masukkan kategori produk"),
    discount: z.number().min(0).max(100, "*Masukkan nominal disocunt produk"),
    stock: z.string().min(1, "*Masukkan jumlah stok produk"),
    description: z.string().min(1, "*Masukkan deskripsi produk"),
    netWeight: z.string().min(1, "*Masukkan berat bersih produk"),
    serialNumber: z.string().min(1, "*Masukkan nomor seri produk"),
    ratedVoltage: z.string().min(1, "*Masukkan ukuran volt produk"),
    labelPromo: z.string().optional(),
  });

  const handleSubmitProduct = (e) => {
    e.preventDefault();
    try {
      // Validate form data
      formDataSchema.parse(formData);
      setErrors({});
      dispatch(
        asyncAddProduct({
          imageUrl,
          ...formData,
        }),
      );
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = {};
        error.errors.forEach((err) => {
          formattedErrors[err.path[0]] = err.message;
        });

        console.log(formattedErrors);
        setErrors(formattedErrors);
      }
    }
  };

  useEffect(() => {
    dispatch(asyncSetCategories());
    dispatch(asyncSetBanners());
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmitProduct} className={`mb-10 bg-white p-10`}>
      <div className=" grid gap-6 md:grid-cols-2 xl:grid-cols-4 ">
        <InputForm
          label="Nama Produk"
          type="text"
          name="name"
          value={name}
          placeholder="Masukkan nama produk"
          className="rounded py-4"
          container="md:col-span-2"
          disabled={loading}
          onChange={handleChange}
          error={errors.name}
        />
        <InputForm
          label="Nama Brand"
          maxLength={50}
          type="text"
          name="brand"
          value={brand}
          placeholder="Masukkan nama brand produk"
          className="text-md rounded py-4"
          disabled={loading}
          onChange={handleChange}
          error={errors.brand}
        />

        <InputForm
          label="Nomor Seri"
          type="text"
          name="serialNumber"
          value={serialNumber}
          placeholder="Masukkan nomor seri produk"
          className="rounded py-4"
          // container="xl:col-span-2"
          disabled={loading}
          onChange={handleChange}
          error={errors.serialNumber}
        />
        <InputForm
          label="Ukuran Volt"
          type="text"
          name="ratedVoltage"
          value={ratedVoltage}
          placeholder="Masukkan jumlah ukuran volt produk"
          className="rounded py-4"
          container="xl:col-span-2"
          disabled={loading}
          onChange={handleChange}
          error={errors.ratedVoltage}
        />

        <InputForm
          label="Harga Produk"
          type="number"
          name="price"
          value={price}
          placeholder={`Masukan nominal harga produk`}
          className="text-md rounded py-4"
          // container="xl:col-span-2"
          disabled={loading}
          onChange={handleChange}
          error={errors.price}
        />

        <InputForm
          label="Berat Bersih"
          type="text"
          name="netWeight"
          value={netWeight}
          placeholder="Masukkan jumlah berat bersih produk"
          className="rounded py-4"
          // container="xl:col-span-2"
          disabled={loading}
          onChange={handleChange}
          error={errors.netWeight}
        />
        <InputForm
          label="Foto Produk"
          required={true}
          type="file"
          name="imageUrl"
          placeholder="Masukan Foto Produk"
          disabled={loading}
          container="xl:col-span-2"
          className="text-md rounded py-4"
          onChange={handleChange}
        />

        <InputForm
          label="Jumlah Stock"
          type="number"
          name="stock"
          value={stock}
          placeholder="Masukkan jumlah stock produk"
          className="text-md rounded py-4"
          disabled={loading}
          onChange={handleChange}
          error={errors.stock}
        />

        <InputForm
          label="Jumlah Discount"
          type="number"
          name="discount"
          value={discount}
          placeholder="Masukkan jumlah discount produk"
          className="text-md rounded py-4"
          disabled={loading}
          onChange={handleChange}
          error={errors.discount}
        />

        <SelectForm
          variant={true}
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
          name="category"
          placeholder="Category"
          className="text-md rounded py-1"
          container="xl:col-span-2"
          onChange={handleChange}
          error={errors.category}
        />
        <SelectForm
          variant={true}
          label="Label Promosi"
          disabled={loading}
          options={
            banners &&
            banners.map((banner) => ({
              key: banner.id,
              label: banner.name?.toUpperCase(),
              value: banner.name?.toLowerCase(),
            }))
          }
          value={labelPromo}
          name="labelPromo"
          placeholder="Label Promosi"
          className="text-md rounded py-1"
          container="xl:col-span-2"
          onChange={handleChange}
          error={errors.labelPromo}
        />
        <Checkbox
          label="Best Seller"
          disabled={loading}
          name="best"
          checked={best}
          onChange={handleChange}
          // error={errors.}
        />

        <Checkbox
          label="Aktif"
          name="isActive"
          disabled={loading}
          checked={isActive}
          onChange={handleChange}
          // error={errors.}
        />
        <TextAreaForm
          label="Deskripsi Product"
          disabled={loading}
          container="md:col-span-2 xl:col-span-4"
          name="description"
          placeholder="Masukkan deskripsi product"
          className="text-md min-h-40 rounded py-1"
          maxLength={500}
          value={description}
          onChange={handleChange}
          // error={errors.}
        />
        <Button
          disabled={loading}
          type="submit"
          variant="btn-1"
          className="py-3 md:col-span-2 xl:col-span-4"
        >
          {loading ? "Sedang di prosers..." : "Tambah"}
        </Button>
      </div>
    </form>
  );
};

export default FormAddProduct;
