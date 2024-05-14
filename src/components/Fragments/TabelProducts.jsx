import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncSetProducts } from "../../redux/products/action";
import Table from "../Elements/Tabel";
import InputForm from "../Elements/Input";

const TabelProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Fungsi untuk melakukan pencarian berdasarkan nama produk
  const search = (rows) => {
    return rows?.filter(
      (row) => row.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
    );
  };

  const dispatch = useDispatch();
  const { products } = useSelector((states) => states.products);

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
      <div className="overflow-x-auto">
        <InputForm
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="my-4 max-w-sm border-gray-300 p-2"
        />
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
