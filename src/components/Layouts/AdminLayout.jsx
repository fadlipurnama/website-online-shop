import { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../Fragments/Admin/Header";
import Sidebar from "../Fragments/Admin/Sidebar";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { authUser } = useSelector((states) => states.auth);

  return (
    <div className="flex h-screen">
      <Sidebar
        authUser={authUser}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          authUser={authUser}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        {/* Main Content */}
        <div className="flex-grow overflow-y-auto px-10 py-4">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
