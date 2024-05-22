import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncSetProducts,
  clearStatusAddProductActionCreator,
} from "../../../redux/products/action";
import Table from "../../Elements/Tabel";
import InputForm from "../../Elements/Input";
import FormAddProduct from "./FormAddProduct";
import Button from "../../Elements/Button";
import { useNavigate } from "react-router-dom";

const TabelProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const { products, message, loading, error, addSuccess } = useSelector(
    (states) => states.products,
  );
  const search = (rows) => {
    return rows?.filter((row) => {
      const nameMatches = row.name.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryMatches = row.category.toLowerCase().includes(searchTerm.toLowerCase());
      const brandMatches = row.brand.toLowerCase().includes(searchTerm.toLowerCase());
  
      return nameMatches || categoryMatches || brandMatches;
    });
  };

  useEffect(() => {
    dispatch(asyncSetProducts());
    if (addSuccess) {
      setOpenForm(false);
      dispatch(clearStatusAddProductActionCreator());
    }
  }, [dispatch, addSuccess]);

  const handleDetailProduct = (productId) => {
    navigate(`/admin/tabel-products/${productId}`);
  };

  return (
    <>
      <h1 className="mb-4 text-2xl font-semibold text-primaryColor">
        Tabel Product
      </h1>
      <div className="flex items-center justify-between">
        <Button
          onClick={() => setOpenForm(!openForm)}
          className={"max-w-52 py-3"}
        >
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
      {openForm && (
        <FormAddProduct message={message} loading={loading} error={error} />
      )}
      <div className="overflow-x-auto">
        <Table
          handleDetailProduct={handleDetailProduct}
          data={search(products)}
          headers={[
            "No",
            "Name",
            "Image",
            "Brand",
            "Best",
            "Discount",
            "Description",
          ]}
        />
      </div>
    </>
  );
};

export default TabelProducts;
