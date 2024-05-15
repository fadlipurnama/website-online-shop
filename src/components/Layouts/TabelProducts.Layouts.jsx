import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncSetProducts } from "../../redux/products/action";
import Table from "../Elements/Tabel";
import InputForm from "../Elements/Input";
import FormAddProduct from "../Fragments/FormAddProduct";
import Button from "../Elements/Buttons";

const TabelProducts = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const { products } = useSelector((states) => states.products);
  const [openForm, setOpenForm] = useState(false);
  // Fungsi untuk melakukan pencarian berdasarkan nama produk
  const search = (rows) => {
    return rows?.filter(
      (row) => row.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    );
  };

  useEffect(() => {
    dispatch(asyncSetProducts());
  }, [dispatch]);

  const handleEdit = (id) => {
    console.log("Edit product with id:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete product with id:", id);
  };

  return (
    <>
      <h1 className="mb-4 text-2xl font-semibold text-primaryColor">
        Tabel Product
      </h1>
      <div className="flex items-center justify-between">
        <Button onClick={() => setOpenForm(!openForm)} className={"max-w-52 py-3"}>
          Add Product
        </Button>
        <InputForm
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="my-4 max-w-sm border-gray-300 p-2"
        />
      </div>
      {openForm && <FormAddProduct />}
      <div className="overflow-x-auto">
        <Table
          data={search(products)}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          headers={["No", "Name", "Image", "Brand", "Description", "Action"]}
        />
      </div>
    </>
  );
};

export default TabelProducts;
