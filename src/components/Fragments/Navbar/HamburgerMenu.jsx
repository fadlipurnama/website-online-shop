import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
// import Button from "../../../Elements/Buttons";
// import { useNavigate } from "react-router-dom";
import { RiMapPinUserFill } from "react-icons/ri";
import {
  LuPackageCheck,
  //  LuUser2
} from "react-icons/lu";
import { IoIosArrowForward, IoIosArrowDown, IoMdLogOut } from "react-icons/io";
import {
  FaCloudDownloadAlt,
  FaWhatsapp,
  FaQuestionCircle,
} from "react-icons/fa";
import { asyncUnsetAuthUser } from "../../../redux/authUser/action";
import { useDispatch } from "react-redux";
import MenuItem from "../../Elements/MenuItem";
import AuthButton from "./AuthButton";
import UserGreetings from "./UserGreetings";

const HamburgerMenu = ({ authUser }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [categoriesDropdown, setCategoriesDropdown] = useState(false);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
    document.body.classList.toggle("overflow-hidden");
  };

  useEffect(() => {
    const handleResize = () => {
      if (innerWidth > 1024) {
        setOpenMenu(false);
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
          <div className="fixed right-0 top-0 z-20 flex h-full w-full max-w-sm flex-col gap-5 bg-white px-5 py-8 lg:hidden">
            {authUser ? (
              <UserGreetings authUser={authUser} isMobile={true} />
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
                icon={<LuPackageCheck className="h-5 w-5" to="" />}
              />
              <MenuItem
                text="Hubungi Kami"
                icon={<FaWhatsapp className="h-5 w-5" to="" />}
              />
              <MenuItem
                text="Download Aplikasi"
                icon={<FaCloudDownloadAlt className="h-5 w-5" to="" />}
              />
              <MenuItem
                text="Tentang Kami"
                icon={<RiMapPinUserFill className="h-5 w-5" to="" />}
              />
              <MenuItem
                text="FAQ"
                icon={<FaQuestionCircle className="h-5 w-5" to="" />}
              />
              {authUser && (
                <div
                  onClick={() => dispatch(asyncUnsetAuthUser())}
                  className="flex cursor-pointer items-center gap-2 text-red-500"
                >
                  <IoMdLogOut className="h-5 w-5" />
                  Logout
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HamburgerMenu;
