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
      ref={sidebar}
      className={`shadowlg absolute inset-y-0 -left-20 z-30 w-72 transform rounded-xl border bg-white p-4 px-5 py-10 transition-transform duration-300 ease-in-out lg:static lg:left-0 lg:translate-x-0 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <nav className="">
        <ul className="flex flex-col gap-6">
          <NavLink
            to="/cart/cart-list"
            className={({ isActive }) =>
              `group flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-gray-600 transition duration-300 ease-in-out hover:bg-gray-200 ${
                isActive ? "bg-gray-200" : ""
              }`
            }
          >
            Keranjang Belanja
          </NavLink>
          <NavLink
            to="setting"
            className={({ isActive }) =>
              `group flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-gray-600 transition duration-300 ease-in-out hover:bg-gray-200 ${
                isActive ? "bg-gray-200" : ""
              }`
            }
          >
            Riwayat Pesanan
          </NavLink>
          <NavLink
            to="daftar-transaksi"
            className={({ isActive }) =>
              `group flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-gray-600 transition duration-300 ease-in-out hover:bg-gray-200 ${
                isActive ? "bg-gray-200" : ""
              }`
            }
          >
            Daftar Transaksi
          </NavLink>
          <NavLink
            to="wishlist"
            className={({ isActive }) =>
              `group flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-gray-600 transition duration-300 ease-in-out hover:bg-gray-200 ${
                isActive ? "bg-gray-200" : ""
              }`
            }
          >
            Wishlist
          </NavLink>
          <NavLink
            to="setting"
            className={({ isActive }) =>
              `group flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-gray-600 transition duration-300 ease-in-out hover:bg-gray-200 ${
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
