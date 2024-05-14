import { useState } from "react";
import MenuItem from "../Elements/MenuItem";
import UserGreetings from "../Fragments/Navbar/UserGreetings";
import ButtonLogout from "../Elements/ButtonLogout";
import { useSelector } from "react-redux";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { authUser } = useSelector((states) => states.auth);
  
  // const handleItemClick = (value) => {
  //   setActivePage(value);
  //   // Close sidebar on mobile after item clicked
  //   if (window.innerWidth <= 768) {
  //     setIsSidebarOpen(false);
  //   }
  // };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`w-full max-w-xs bg-white ${isSidebarOpen ? "block" : "hidden"} md:block`}
      >
        <div className="p-4">
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>
        <UserGreetings isMobile={true} />
        <div className="flex flex-col overflow-y-auto py-6 text-lg">
          <MenuItem
            bgHover={true}
            to={"/admin/add-product"}
            text={"Add Product"}
          />
          <MenuItem
            bgHover={true}
            to={"/admin/add-category"}
            text={"Add Category"}
          />
          {authUser && <ButtonLogout bgHover={true} />}
        </div>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden">
        <button className="p-4" onClick={toggleSidebar}>
          <svg className="h-6 w-6 fill-current text-white" viewBox="0 0 24 24">
            {isSidebarOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>
      {/* Main Content */}
      <div className="flex w-full flex-col">
        {/* Header */}
        <div className="bg-white px-4">
          <UserGreetings authUser={authUser} />
        </div>
        {/* Main Content */}
        <div className="flex-grow p-4">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
