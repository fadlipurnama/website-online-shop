import { NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { useEffect, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { TiArrowSortedDown } from "react-icons/ti";

const Sidebar = ({ setIsSidebarOpen, isSidebarOpen }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const { pathname } = useLocation();

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
          <SidebarLinkGroup
            activeCondition={
              pathname === "/admin/tabel-products" ||
              pathname.includes("tabel-products/")
            }
          >
            {(handleClick, open) => (
              <>
                <NavLink
                  to="#"
                  className={`group flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-gray-600 transition duration-300 ease-in-out hover:bg-gray-200 ${
                    pathname === "/admin/tabel-products" ? "bg-gray-200" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                  }}
                >
                  Tabel Products
                  <TiArrowSortedDown
                    className={`ml-auto transform transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </NavLink>
                <div className={`${!open ? "hidden" : ""} pl-8`}>
                  <ul className="flex flex-col gap-2.5">
                    <li>
                      <NavLink
                        to="/admin/tabel-products"
                        className={`${pathname === "/admin/tabel-products" ? "bg-gray-200" : ""} flex items-center gap-2.5 rounded-md px-4 py-2 font-medium text-gray-600 transition duration-300 ease-in-out hover:bg-gray-200`}
                      >
                        View Products
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </SidebarLinkGroup>
          <SidebarLinkGroup
            activeCondition={
              pathname === "/admin/tabel-categories" ||
              pathname.includes("tabel-categories")
            }
          >
            {(handleClick, open) => (
              <>
                <NavLink
                  to="#"
                  className={`flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-gray-600 transition duration-300 ease-in-out hover:bg-gray-200 ${
                    pathname === "/admin/tabel-categories" ? "bg-gray-200" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                  }}
                >
                  Tabel Categories
                  <TiArrowSortedDown
                    className={`ml-auto transform transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </NavLink>
                <div className={`${!open ? "hidden" : ""} pl-8`}>
                  <ul className="flex flex-col gap-2.5">
                    <li>
                      <NavLink
                        to="/admin/tabel-categories"
                        className={`group flex ${pathname === "/admin/tabel-categories" ? "bg-gray-200" : ""}  items-center gap-2.5 rounded-md px-4 py-2 font-medium text-gray-600 transition duration-300 ease-in-out hover:bg-gray-200`}
                      >
                        View Categories
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </SidebarLinkGroup>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
