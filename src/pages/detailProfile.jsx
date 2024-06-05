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
    <DefaultLayout label={`${authUser?.firstName} ${authUser?.lastName}`}>
      <div className="flex min-h-[80vh] w-full gap-5">
        <SidebarUserProfile />
        <div className="flex-1 bg-white p-6 sm:p-8 md:p-10">
          <Outlet />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default DetailProfilePage;
