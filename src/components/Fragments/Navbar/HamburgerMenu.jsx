import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
// import Button from "../../../Elements/Buttons";
// import { useNavigate } from "react-router-dom";
import { RiMapPinUserFill } from "react-icons/ri";
import {
  LuPackageCheck,
  LuUser2,
  //  LuUser2
} from "react-icons/lu";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import {
  FaCloudDownloadAlt,
  FaWhatsapp,
  FaQuestionCircle,
} from "react-icons/fa";
import MenuItem from "../../Elements/MenuItem";
import AuthButton from "./AuthButton";
import ButtonLogout from "../../Elements/ButtonLogout";

const HamburgerMenu = ({ authUser }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [categoriesDropdown, setCategoriesDropdown] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
    document.body.classList.toggle("overflow-hidden");
  };

  useEffect(() => {
    const handleResize = () => {
      if (innerWidth > 1024) {
        setOpenMenu(false);
        document.body.classList.remove("overflow-hidden");
      }
    };
    handleResize();
    addEventListener("resize", handleResize);
    return () => removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* HamburgerMenu */}
      <FiMenu
        className="h-6 w-6 cursor-pointer lg:hidden"
        onClick={toggleMenu}
      />

      {/* Hamburger Menu Dropdown */}
      {openMenu && (
        <>
          <div
            className="fixed left-0 top-0 z-10 h-full w-full bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={toggleMenu}
          ></div>

          {/* Dropdown Menu */}
          <div className="fixed overflow-y-auto right-0 top-0 z-20 flex h-full w-full max-w-sm flex-col gap-5 bg-white px-5 py-8 lg:hidden">
            {authUser ? (
              <div className="flex-col flex w-full cursor-pointer items-center gap-2 rounded-sm border-b-2 px-4 py-2 font-medium text-gray-600 lg:w-auto">
                <LuUser2 className="h-32 w-32 rounded-full border-4 border-slate-600 text-slate-600 lg:h-10 lg:w-10 lg:border-2" />
                <span className="items-center flex flex-col">
                  <span className="font-light">Selamat datang,</span>
                  <span>
                    {authUser && `${authUser.firstName} ${authUser.lastName}`}
                  </span>
                </span>
              </div>
            ) : (
              <AuthButton className="mx-auto flex w-11/12 gap-2" />
            )}

            {/* List */}
            <div className="flex w-full flex-col gap-4 px-5">
              <div
                onClick={() => setCategoriesDropdown(!categoriesDropdown)}
                className={`${categoriesDropdown && "font-semibold text-primaryColor"} flex cursor-pointer items-center justify-between pt-2`}
              >
                Product Categories
                {categoriesDropdown ? (
                  <IoIosArrowDown />
                ) : (
                  <IoIosArrowForward />
                )}
              </div>
              {categoriesDropdown && (
                <div className="mb-2 flex flex-col bg-gray-200 px-2 py-2">
                  <MenuItem text="Kabel" to="" />
                  <MenuItem text="Kabel" to="" />
                  <MenuItem text="Kabel" to="" />
                </div>
              )}
              <MenuItem
                text="Cek Resi"
                icon={<LuPackageCheck className="h-5 w-5" />}
                to="/cek-resi"
              />
              <MenuItem
                text="Hubungi Kami"
                icon={<FaWhatsapp className="h-5 w-5" />}
                to="/contact-us"
              />
              <MenuItem
                text="Download Aplikasi"
                icon={<FaCloudDownloadAlt className="h-5 w-5" />}
                to="download-aplikasi"
              />
              <MenuItem
                text="Tentang Kami"
                icon={<RiMapPinUserFill className="h-5 w-5" />}
                to="about-us"
              />
              <MenuItem
                text="FAQ"
                icon={<FaQuestionCircle className="h-5 w-5" />}
                to="faq"
              />
              {authUser && <ButtonLogout iconOn={true} />}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HamburgerMenu;
