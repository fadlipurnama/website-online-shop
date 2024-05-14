import { IoMdLogOut } from "react-icons/io";
import { asyncUnsetAuthUser } from "../../../redux/authUser/action";
import { useDispatch } from "react-redux";

const ButtonLogout = ({ iconOn, bgHover }) => {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => dispatch(asyncUnsetAuthUser())}
      className={`flex cursor-pointer items-center gap-2 text-red-500 ${bgHover && "hover:bg-slate-100 hover:font-medium p-4"}
      `}
    >
      {iconOn && <IoMdLogOut className="h-5 w-5" />}
      Logout
    </div>
  );
};

export default ButtonLogout;
