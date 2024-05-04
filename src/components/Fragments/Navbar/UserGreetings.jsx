import { useEffect, useState } from "react";
import { IoMdLogOut } from "react-icons/io";
import { LuUser2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { asyncUnsetAuthUser } from "../../../redux/authUser/action";
import { useDispatch } from "react-redux";

const UserGreetings = ({ authUser, isMobile }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openDropdown, setOpenDropdown] = useState(false);

  const toggleDropdown = () => {
    if (window.innerWidth > 1024) {
      setOpenDropdown(!openDropdown);
    } else {
      navigate(`/${authUser._id}`);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (innerWidth < 1024) {
        setOpenDropdown(false);
      }
    };
    handleResize();
    addEventListener("resize", handleResize);
    return () => removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <div
        onClick={toggleDropdown}
        className={`mx-auto lg:mx-0 ${isMobile ? "flex lg:hidden" : "hidden lg:flex"} cursor-pointer flex-col items-center gap-2 border-b-2 px-5 py-3 lg:flex-row-reverse lg:border-none lg:px-0`}
      >
        <LuUser2 className="h-32 w-32 rounded-full border-4 border-slate-600 text-slate-600 lg:h-10 lg:w-10 lg:border-2" />
        <span>Selamat datang, {authUser.firstName}</span>
      </div>
      {openDropdown && (
        <div className="absolute right-0 top-16 flex w-full max-w-52 flex-col rounded-lg border bg-white lg:right-28">
          <div
            onClick={() => navigate(`/${authUser._id}`)}
            className="flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-slate-100 hover:font-medium"
          >
            <LuUser2 className="h-5 w-5" />
            Lihat Profile
          </div>
          <div
            onClick={() => dispatch(asyncUnsetAuthUser())}
            className="flex cursor-pointer items-center gap-2 px-3 py-2 text-red-500 hover:bg-slate-100 hover:font-medium"
          >
            <IoMdLogOut className="h-5 w-5" />
            Logout
          </div>
        </div>
      )}
    </>
  );
};

export default UserGreetings;
