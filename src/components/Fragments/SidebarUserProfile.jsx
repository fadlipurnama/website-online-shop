import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

const SidebarUserProfile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebar = useRef(null);
  const trigger = useRef(null);

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

    const handleKeydown = (event) => {
      if (event.key === "Escape") {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [setIsSidebarOpen]);
  return (
    <aside
      // ref={sidebar}
      className={`shadowl-g fixed inset-y-0 -left-20 z-30 w-full max-w-xs transform rounded-xl border bg-white p-4 px-6 py-10 shadow transition-transform duration-300 ease-in-out lg:static lg:left-0 lg:translate-x-0 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <nav className="">
        <ul className="flex flex-col gap-6 text-lg">
          <NavLink
            to="/user-profile"
            end
            className={({ isActive }) =>
              `group flex items-center gap-2.5 rounded-lg border px-4 py-2 font-medium text-gray-600 shadow transition duration-300 ease-in-out hover:bg-gray-200 ${
                isActive ? "bg-gray-200" : ""
              }`
            }
          >
            Profile
          </NavLink>
        
          <NavLink
            to="daftar-pesanan"
            className={({ isActive }) =>
              `group flex items-center gap-2.5 rounded-lg border px-4 py-2 font-medium text-gray-600 shadow transition duration-300 ease-in-out hover:bg-gray-200 ${
                isActive ? "bg-gray-200" : ""
              }`
            }
          >
            Daftar Pesanan
          </NavLink>
          <NavLink
            to="daftar-transaksi"
            className={({ isActive }) =>
              `group flex items-center gap-2.5 rounded-lg border px-4 py-2 font-medium text-gray-600 shadow transition duration-300 ease-in-out hover:bg-gray-200 ${
                isActive ? "bg-gray-200" : ""
              }`
            }
          >
            Daftar Transaksi
          </NavLink>
          <NavLink
            to="wishlist"
            className={({ isActive }) =>
              `group flex items-center gap-2.5 rounded-lg border px-4 py-2 font-medium text-gray-600 shadow transition duration-300 ease-in-out hover:bg-gray-200 ${
                isActive ? "bg-gray-200" : ""
              }`
            }
          >
            Wishlist
          </NavLink>
          <NavLink
            to="setting"
            className={({ isActive }) =>
              `group flex items-center gap-2.5 rounded-lg border px-4 py-2 font-medium text-gray-600 shadow transition duration-300 ease-in-out hover:bg-gray-200 ${
                isActive ? "bg-gray-200" : ""
              }`
            }
          >
            Setting
          </NavLink>
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarUserProfile;
