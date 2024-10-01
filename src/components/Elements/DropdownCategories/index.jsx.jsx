import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import MenuItem from "../MenuItem";

const DropdownCategories = ({ onClick }) => {
  const [categoriesDropdown, setCategoriesDropdown] = useState(false);
  return (
    <>
      <div
        onClick={() => setCategoriesDropdown(!categoriesDropdown)}
        className={`${categoriesDropdown && "font-semibold text-primaryColor"} flex cursor-pointer items-center justify-between pt-2`}
      >
        Product Categories
        {categoriesDropdown ? <IoIosArrowDown /> : <IoIosArrowForward />}
      </div>
      {categoriesDropdown && (
        <div className="mb-2 flex flex-col bg-gray-200 px-2 py-2">
          <MenuItem
            onClick={onClick}
            text="Kontaktor"
            to="/products/kontaktor"
          />
          <MenuItem
            onClick={onClick}
            text="Power Supply"
            to="/products/power supply"
          />
          <MenuItem onClick={onClick} text="MCB" to="/products/mcb" />
          <MenuItem onClick={onClick} text="Lampu" to="/products/lampu" />
          <MenuItem onClick={onClick} text="Inverter" to="/products/inverter" />
          <MenuItem onClick={onClick} text="Other" to="/products/other" />
        </div>
      )}
    </>
  );
};

export default DropdownCategories;
