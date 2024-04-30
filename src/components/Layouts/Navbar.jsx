import { Link, useNavigate } from "react-router-dom";
import Input from "../Elements/Input/Input";
import { CiSearch } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import Button from "../Elements/Buttons";
import { useState } from "react";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <div className="w-full flex gap-2 px-4 py-2 bg-white justify-around items-center shadow-sm lg:p-5">
      <span className="text-[10px] text-primaryColor font-semibold lg:text-xl">
        Anugrah Hadi Electric
      </span>
      <div className="w-3/5 rounded-lg flex flex-col lg:w-1/2">
        <div className="flex gap-1 items-center border rounded-lg px-2">
          <CiSearch className="w-4 h-4 lg:w-6 lg:h-6" />
          <Input
            placeholder="Search..."
            className="outline-none text-[12px] py-1 lg:py-3 lg:text-base"
          />
        </div>
        <div className="hidden w-full justify-end gap-3 items-center lg:flex">
          <Link className="hover:text-primaryColor" to="">
            Cek Resi
          </Link>
          <Link className="hover:text-primaryColor" to="">
            Tentang Kami
          </Link>
          <Link className="hover:text-primaryColor" to="">
            Download
          </Link>
          <Link className="hover:text-primaryColor" to="">
            FAQ
          </Link>
        </div>
      </div>
      <div className="hidden items-center gap-10 w-40 h-20 justify-center lg:flex">
        <div className="w-8 h-8 relative">
          <div className="bg-red-500 text-white text-sm h-4 w-4 flex items-center justify-center absolute -top-[10%] -right-[5%] rounded-full"></div>
          <IoMdNotificationsOutline className="w-full h-full" />
        </div>
        <div className="w-8 h-8 relative">
          <div className="bg-red-500 text-white text-sm h-6 w-6 flex items-center justify-center absolute -top-1/3 -right-1/3 rounded-full">
            <span>1</span>
          </div>
          <AiOutlineShoppingCart className="w-full h-full" />
        </div>
      </div>
      <div className="hidden gap-2 lg:flex">
        <Button
          onClick={() => {
            navigate("/login");
          }}
          className="py-5 px-6"
          variant="btn-1"
        >
          LOGIN
        </Button>
        <Button
          onClick={() => {
            navigate("/register");
          }}
          className="py-5 px-6"
          variant="btn-2"
        >
          DAFTAR
        </Button>
      </div>
      {!menu ? (
        <FiMenu
          onClick={handleMenu}
          className={`w-6 h-6 cursor-pointer lg:hidden`}
        />
      ) : (
        <IoClose
          onClick={handleMenu}
          className={`w-6 h-6 cursor-pointer lg:hidden`}
        />
      )}
    </div>
  );
};

export default Navbar;
