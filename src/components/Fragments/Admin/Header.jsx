import { FiMenu } from "react-icons/fi";
import DropdownUser from "../../Elements/DropdownUser";

const Header = ({ authUser, setIsSidebarOpen, isSidebarOpen }) => {
  return (
    <>
      <header className="bg-white px-6 py-4 shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <FiMenu
              className="h-6 w-6 cursor-pointer lg:hidden"
              onClick={(e) => {
                e.stopPropagation();
                setIsSidebarOpen(!isSidebarOpen);
              }}
            />
          </div>
          <div className="flex items-center gap-3.5">
            <DropdownUser dropdownPosition="top-20" authUser={authUser} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
