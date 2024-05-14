import { useState } from "react";
import Button from "../Elements/Buttons";
import InputForm from "../Elements/Input";
import SelectForm from "../Elements/Select";

const FormAddProduct = () => {
  const [openForm, setOpenForm] = useState(false);
  const toggleFormProduct = () => {
    setOpenForm(!openForm);
  };

  return (
    <div className="">
      <Button onClick={toggleFormProduct} className={"max-w-40 py-4"}>
        Add Product
      </Button>
      {openForm && (
        <form className="grid grid-cols-2 gap-2 py-4">
          <InputForm
            label="Nama Product"
            type="text"
            name="title"
            placeholder="Masukkan Nama Product"
            className="text-md rounded py-3"
            // onChange={handleChange}
          />
          <InputForm
            label="Nama Brand"
            type="text"
            name="brand"
            placeholder="Masukkan Nama Product"
            className="text-md rounded py-3"
            // onChange={handleChange}
          />
          <InputForm
            label="Stock"
            type="number"
            name="stock"
            placeholder="Masukkan Nama Product"
            className="text-md rounded py-3"
            // onChange={handleChange}
          />
          <SelectForm
            name="category"
            label="Category"
            options={[
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2" },
              { label: "Option 3", value: "option3" },
            ]}
            placeholder="Select an option"
            required={true}
            className="text-md rounded py-3"
          />
        </form>
      )}
    </div>
  );
};

export default FormAddProduct;
