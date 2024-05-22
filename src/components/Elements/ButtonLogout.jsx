import { IoMdLogOut } from "react-icons/io";
import { asyncUnsetAuthUser } from "../..//redux/authUser/action";
import { useDispatch } from "react-redux";

const ButtonLogout = ({ iconOn, bgHover, isMobile }) => {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => dispatch(asyncUnsetAuthUser())}
      className={`cursor-pointer ${isMobile ? "flex lg:hidden" : "flex"} items-center gap-2 text-red-500 ${bgHover && "p-4 hover:bg-slate-100 hover:font-medium"}
      `}
    >
      {iconOn && <IoMdLogOut className="h-5 w-5" />}
      Logout
    </div>
  );
};

export default ButtonLogout;
