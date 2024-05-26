import { LuPackageCheck, LuUser2 } from "react-icons/lu";
import MenuItem from "../MenuItem";
import {
  FaCloudDownloadAlt,
  FaQuestionCircle,
  FaWhatsapp,
} from "react-icons/fa";
import { RiMapPinUserFill } from "react-icons/ri";
import ButtonLogout from "../ButtonLogout";
import DropdownCategories from "../DropdownCategories/index.jsx";
import Button from "../Button.jsx";
import { useNavigate } from "react-router-dom";

const DropdownHamburgerList = ({ authUser }) => {
  const navigate = useNavigate();
  return (
    <>
      {authUser ? (
        <div className="flex w-full cursor-pointer flex-col items-center gap-2 rounded-sm border-b-2 px-4 py-2 font-medium text-gray-600 lg:w-auto">
          <LuUser2 className="h-32 w-32 rounded-full border-4 border-slate-600 text-slate-600 lg:h-10 lg:w-10 lg:border-2" />
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
        <DropdownCategories />

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
    </>
  );
};

export default DropdownHamburgerList;
