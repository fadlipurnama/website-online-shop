import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfileIcon from "../../Elements/Profile";

const NavMenu = () => {
  const [menu, setMenu] = useState(false);
  const { authUser, loading } = useSelector((state) => state.auth);

  return (
    <>
      <div className="hidden w-full items-center justify-end gap-3 lg:flex">
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
      {!menu ? (
        <FiMenu
          onClick={() => setMenu(!menu)}
          className={`absolute right-8 top-2.5 h-6 w-6 cursor-pointer lg:hidden`}
        />
      ) : (
        <IoClose
          onClick={() => setMenu(!menu)}
          className={`absolute right-8 top-2.5 h-6 w-6 cursor-pointer lg:hidden`}
        />
      )}
    </>
  );
};

export default NavMenu;
