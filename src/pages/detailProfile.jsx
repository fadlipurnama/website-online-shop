import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import SidebarUserProfile from "../components/Fragments/SidebarUserProfile";
import { useEffect } from "react";

const DetailProfilePage = () => {
  const { authUser } = useSelector((states) => states.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate("/");
    }
  }, [authUser, navigate]);

  return (
    <DefaultLayout title="Tersedia Berbagai Barang Elektrik | User Profile" label={`${authUser?.firstName} ${authUser?.lastName}`}>
      <div className="flex min-h-[80vh] w-full">
        <SidebarUserProfile />
        <div className="flex-1 bg-white px-6">
          <Outlet />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default DetailProfilePage;
