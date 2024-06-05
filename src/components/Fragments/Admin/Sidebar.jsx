import { NavLink } from "react-router-dom";
import { useEffect, useRef } from "react";
import { CgClose } from "react-icons/cg";

const Sidebar = ({ setIsSidebarOpen, isSidebarOpen }) => {
  const trigger = useRef(null);
  const sidebar = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebar.current.contains(event.target) &&
        !trigger.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsSidebarOpen]);

  return (
    <aside
      ref={sidebar}
      className={`${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed inset-y-0 left-0 z-30 w-64 transform overflow-y-auto bg-white py-4 transition duration-300 ease-in-out lg:static lg:inset-0 lg:translate-x-0`}
    >
      <div className="flex justify-between px-4 py-2">
        <span className="text-center font-semibold text-primaryColor lg:text-xl">
          Anugrah Hadi Electric
        </span>
        <CgClose
          className="h-6 w-6 cursor-pointer lg:hidden"
          onClick={(e) => {
            e.stopPropagation();
            setIsSidebarOpen(!isSidebarOpen);
          }}
        />
      </div>

      <nav className="px-4 py-6">
        <ul className="flex flex-col gap-4">
          <NavLink
            to=""
            className={({ isActive }) =>
              `group flex rounded-lg items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-gray-600 transition duration-300 ease-in-out hover:bg-gray-200 ${
                isActive ? "bg-gray-200" : ""
              }`
            }
          >
            Tabel Products
          </NavLink>
          <NavLink
            to="tabel-categories"
            className={({ isActive }) =>
              `group flex rounded-lg items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-gray-600 transition duration-300 ease-in-out hover:bg-gray-200 ${
                isActive ? "bg-gray-200" : ""
              }`
            }
          >
            Tabel Categories
          </NavLink>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
