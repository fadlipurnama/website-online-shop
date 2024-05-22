import { useEffect, useRef, useState } from "react";
import { LuUser2 } from "react-icons/lu";
import { useLocation } from "react-router-dom";
import DropdownUserList from "./DropdownUserList";

const DropdownUser = ({ authUser, dropdownPosition }) => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const { pathname } = useLocation();

  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);

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
      if (!dropdownRef.current || !triggerRef.current) return;
      if (
        !dropdownRef.current.contains(event.target) &&
        !triggerRef.current.contains(event.target)
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
        ref={triggerRef}
        onClick={() => setDropdownIsOpen(!dropdownIsOpen)}
        className="flex cursor-pointer items-center gap-4 rounded-sm px-0 py-2 font-medium text-gray-600 outline-none transition duration-300 ease-in-out"
      >
        <span className="flex flex-col items-end">
          <span className="font-light">Selamat datang,</span>
          <span>
            {authUser && `${authUser.firstName} ${authUser.lastName}`}
          </span>
        </span>
        <LuUser2 className="h-10 w-10 rounded-full border-2 border-slate-600 text-slate-600" />
      </button>
      {dropdownIsOpen && (
        <DropdownUserList
          dropdownPosition={dropdownPosition}
          userId={authUser._id}
          dropdownIsOpen={dropdownIsOpen}
          dropdownRef={dropdownRef}
        />
      )}
    </div>
  );
};

export default DropdownUser;
