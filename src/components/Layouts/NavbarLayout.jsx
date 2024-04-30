import { useNavigate } from "react-router-dom";
import Input from "../Elements/Input/Input";
import { CiSearch } from "react-icons/ci";
import { IoMdNotificationsOutline } from "react-icons/io";
// import { IoClose } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";
// import { FiMenu } from "react-icons/fi";
import Button from "../Elements/Buttons";
import { useState } from "react";
import NavMenu from "../Fragments/Navbar/Menu";
import NavAuth from "../Fragments/Navbar/Auth";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { authUser, loading } = useSelector((state) => state.auth);

  return (
    <div className="relative flex w-full items-center justify-around gap-2 bg-white px-4 py-2 shadow-sm lg:p-5">
      <span className="text-[10px] font-semibold text-primaryColor lg:text-xl">
        Anugrah Hadi Electric
      </span>
      <div className="flex w-3/5 flex-col rounded-lg lg:w-1/2">
        <div className="flex items-center gap-1 rounded-lg border px-2">
          <CiSearch className="h-4 w-4 lg:h-6 lg:w-6" />
          <Input
            placeholder="Search..."
            className="border-none py-1 text-[12px] outline-none lg:py-3 lg:text-base"
          />
        </div>
        <NavMenu />
      </div>
      <div className="hidden h-20 w-40 items-center justify-center gap-10 lg:flex">
        <div className="relative h-8 w-8">
          <div className="absolute -right-[5%] -top-[10%] flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-sm text-white"></div>
          <IoMdNotificationsOutline className="h-full w-full" />
        </div>
        <div className="relative h-8 w-8">
          <div className="absolute -right-1/3 -top-1/3 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-sm text-white">
            <span>1</span>
          </div>
          <AiOutlineShoppingCart className="h-full w-full" />
        </div>
      </div>

      {loading ? (
        <div className="h-11 w-40 animate-pulse bg-slate-400"></div>
      ) : (
        <NavAuth authUser={authUser} loading={loading} />
      )}
    </div>
  );
};

export default Navbar;
