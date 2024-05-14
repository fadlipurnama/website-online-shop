import { Outlet } from "react-router-dom";
import AdminLayout from "../../components/Layouts/AdminLayout";

const AdminPage = () => {
  return (
    <AdminLayout>
       <Outlet />
    </AdminLayout>
  );
};

export default AdminPage;
