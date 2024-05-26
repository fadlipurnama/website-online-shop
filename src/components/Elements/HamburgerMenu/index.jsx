import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import DropdownHamburgerList from "./DropdownHamburgerList";

const HamburgerMenu = ({ authUser }) => {
  const [openMenu, setOpenMenu] = useState(false);

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
      <FiMenu
        className="h-6 w-6 cursor-pointer lg:hidden"
        onClick={toggleMenu}
      />

      {openMenu && (
        <>
          <div
            className="fixed left-0 top-0 z-10 h-full w-full bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={toggleMenu}
          ></div>

          {/* Dropdown Menu */}
          <div className="fixed right-0 top-0 z-20 flex h-full w-full max-w-sm flex-col gap-5 overflow-y-auto bg-white px-5 py-8 lg:hidden">
            {/* List */}
            <DropdownHamburgerList authUser={authUser} />
          </div>
        </>
      )}
    </>
  );
};

export default HamburgerMenu;
