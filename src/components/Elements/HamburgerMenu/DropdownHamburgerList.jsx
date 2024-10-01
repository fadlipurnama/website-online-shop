import { LuUser2 } from "react-icons/lu";
import MenuItem from "../MenuItem";
import { FaCloudDownloadAlt, FaWhatsapp } from "react-icons/fa";
import { RiMapPinUserFill } from "react-icons/ri";
import ButtonLogout from "../ButtonLogout";
import { CiViewList } from "react-icons/ci";
import DropdownCategories from "../DropdownCategories/index.jsx";
import Button from "../Button.jsx";
import { useNavigate } from "react-router-dom";
import LazyImage from "../LazyImage.jsx";
import { FiMenu } from "react-icons/fi";

const DropdownHamburgerList = ({ authUser, setOpenMenu, openMenu }) => {
  const navigate = useNavigate();
  const toggleMenu = () => {
    setOpenMenu(!openMenu);
    document.body.classList.toggle("overflow-hidden");
  };

  return (
    <>
      <FiMenu
        className="h-6 w-6 cursor-pointer lg:hidden"
        onClick={toggleMenu}
      />
      {authUser ? (
        <div className="flex w-full cursor-pointer flex-col items-center gap-2 rounded-sm border-b-2 px-4 py-2 font-medium text-gray-600 lg:w-auto">
          {!authUser.imageUrl ? (
            <LuUser2
              onClick={() => {
                navigate(`/user-profile`);
                toggleMenu();
              }}
              className="h-32 w-32 rounded-full border-4 border-slate-600 text-slate-600 lg:h-10 lg:w-10 lg:border-2"
            />
          ) : (
            <LazyImage
              onClick={() => {
                navigate(`/user-profile`);
                toggleMenu();
              }}
              src={authUser.imageUrl}
              className={"h-32 w-32 rounded-full bg-cover"}
            />
          )}
          <div className="flex flex-col items-center">
            <span className="font-light">Selamat datang,</span>
            <span>
              {authUser && `${authUser.firstName} ${authUser.lastName}`}
            </span>
          </div>
        </div>
      ) : (
        <div className="mx-auto flex w-11/12 gap-2">
          <Button
            onClick={() => {
              navigate("/login");
            }}
            className="px-6 py-5"
            variant="btn-1"
          >
            MASUK
          </Button>
          <Button
            onClick={() => {
              navigate("/register");
            }}
            className="px-6 py-5"
            variant="btn-2"
          >
            DAFTAR
          </Button>
        </div>
      )}
      <div className="flex w-full flex-col gap-4 px-5">
        <DropdownCategories onClick={toggleMenu} />
        <MenuItem
          onClick={toggleMenu}
          text="Hubungi Kami"
          icon={<FaWhatsapp className="h-5 w-5" />}
          to="/contact-us"
        />
        <MenuItem
          onClick={toggleMenu}
          text="Download Aplikasi"
          icon={<FaCloudDownloadAlt className="h-5 w-5" />}
          target="_blank"
          to="https://drive.google.com/drive/u/0/mobile/folders/1vLYrYPmBR11saJxqrWYFTII-jD9HR9SW?usp=sharing"
        />
        <MenuItem
          onClick={toggleMenu}
          text="Tentang Kami"
          icon={<RiMapPinUserFill className="h-5 w-5" />}
          to="/about-us"
        />
        <MenuItem
          onClick={toggleMenu}
          text="Wishlist"
          icon={<CiViewList className="h-5 w-5" />}
          to={`/user-profile/wishlist`}
        />

        {authUser && <ButtonLogout iconOn={true} />}
      </div>
    </>
  );
};

export default DropdownHamburgerList;
