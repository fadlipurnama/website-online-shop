import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import MenuItem from "../MenuItem";

const DropdownCategories = () => {
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
          <MenuItem text="Kabel" to="" />
          <MenuItem text="Kabel" to="" />
          <MenuItem text="Kabel" to="" />
        </div>
      )}
    </>
  );
};

export default DropdownCategories;
