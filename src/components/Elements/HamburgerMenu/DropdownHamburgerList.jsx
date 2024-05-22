import { LuPackageCheck } from "react-icons/lu";
import MenuItem from "../MenuItem";
import {
  FaCloudDownloadAlt,
  FaQuestionCircle,
  FaWhatsapp,
} from "react-icons/fa";
import { RiMapPinUserFill } from "react-icons/ri";
import ButtonLogout from "../ButtonLogout";
import DropdownCategories from "../DropdownCategories/index.jsx";

const DropdownHamburgerList = ({ authUser }) => {
  return (
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
  );
};

export default DropdownHamburgerList;
