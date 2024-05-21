import { useEffect, useRef, useState } from "react";
import { LuUser2 } from "react-icons/lu";
import ButtonLogout from "../ButtonLogout";
import { useLocation, useNavigate } from "react-router-dom";

const DropdownUser = ({ authUser, dropdownPosition }) => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const trigger = useRef(null);
  const dropdown = useRef(null);

  const toggleDropdown = () => {
    setDropdownIsOpen(!dropdownIsOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (innerWidth < 1024) {
        setDropdownIsOpen(false);
      }
    };
    handleResize();
    addEventListener("resize", handleResize);
    return () => removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const clickHandler = (event) => {
      if (!dropdown.current || !trigger.current) return;
      if (
        !dropdown.current.contains(event.target) &&
        !trigger.current.contains(event.target)
      ) {
        setDropdownIsOpen(false);
      }
    };

    document.addEventListener("click", clickHandler);
    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, [dropdownIsOpen]);

  useEffect(() => {
    const keyHandler = (event) => {
      if (event.key === "Escape") {
        setDropdownIsOpen(false);
      }
    };
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("keydown", keyHandler);
    };
  }, [dropdownIsOpen]);

  return (
    <div
      className={`relative ${pathname.includes("/admin") ? "block" : "hidden lg:block"} w-full lg:w-auto`}
    >
      <button
        ref={trigger}
        onClick={toggleDropdown}
        className="flex cursor-pointer items-center gap-4 rounded-sm px-0 py-2 font-medium text-gray-600 transition duration-300 ease-in-out"
      >
        <span className="flex flex-col items-end">
          <span className="font-light">Selamat datang,</span>
          <span>
            {authUser && `${authUser.firstName} ${authUser.lastName}`}
          </span>
        </span>
        <LuUser2 className="h-10 w-10 rounded-full border-2 border-slate-600 text-slate-600" />
      </button>
      <div
        ref={dropdown}
        className={`absolute z-50 ${dropdownPosition}  w-full max-w-60 flex-col rounded-sm border bg-white shadow-lg ${
          dropdownIsOpen ? "flex" : "hidden"
        }`}
      >
        <div
          onClick={() => {
            setDropdownIsOpen(false);
            navigate(`/profile-user/${authUser._id}`);
          }}
          className="flex cursor-pointer items-center gap-2 p-4 hover:bg-slate-100 hover:font-medium"
        >
          <LuUser2 className="h-5 w-5" />
          Lihat Profile
        </div>
        <ButtonLogout iconOn={true} bgHover={true} />
      </div>
    </div>
  );
};

export default DropdownUser;
