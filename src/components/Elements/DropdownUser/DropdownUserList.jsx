import { LuUser2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import ButtonLogout from "../ButtonLogout";

const DropdownUserList = ({
  dropdownPosition,
  authUser,
  setDropdownIsOpen,
  dropdownRef,
}) => {

  console.log(authUser)
  const navigate = useNavigate();
  return (
    <div
      ref={dropdownRef}
      className={`absolute z-50 ${dropdownPosition} w-60 flex-col rounded-sm border bg-white shadow-lg 
        `}
    >
      <div
        onClick={() => {
          setDropdownIsOpen(false);
          navigate(`/user-profile/${authUser._id}`);
        }}
        className="flex cursor-pointer items-center gap-2 p-4 hover:bg-slate-100 hover:font-medium"
      >
        <LuUser2 className="h-5 w-5" />
        Lihat Profile
      </div>
      <ButtonLogout iconOn={true} bgHover={true} />
    </div>
  );
};

export default DropdownUserList;
