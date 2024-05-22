import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import DropdownHamburgerList from "./DropdownHamburgerList";
import { LuUser2 } from "react-icons/lu";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const HamburgerMenu = ({ authUser }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate()

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
          <div className="fixed right-0 top-0 z-20 flex h-full w-full max-w-sm flex-col gap-5 overflow-y-auto bg-white px-5 py-8 lg:hidden">
            {authUser ? (
              <div className="flex w-full cursor-pointer flex-col items-center gap-2 rounded-sm border-b-2 px-4 py-2 font-medium text-gray-600 lg:w-auto">
                <LuUser2 className="h-32 w-32 rounded-full border-4 border-slate-600 text-slate-600 lg:h-10 lg:w-10 lg:border-2" />
                <span className="flex flex-col items-center">
                  <span className="font-light">Selamat datang,</span>
                  <span>
                    {authUser && `${authUser.firstName} ${authUser.lastName}`}
                  </span>
                </span>
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

            {/* List */}
            <DropdownHamburgerList authUser={authUser} />
          </div>
        </>
      )}
    </>
  );
};

export default HamburgerMenu;
