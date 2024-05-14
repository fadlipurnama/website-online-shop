import { useSelector } from "react-redux";
import AuthButton from "../Fragments/Navbar/AuthButton";
import SearchBarMenu from "../Fragments/Navbar/SearchBarMenu";
import CartIcon from "../Elements/CartIcon";
import HamburgerMenu from "../Fragments/Navbar/HamburgerMenu";
import UserGreetings from "../Fragments/Navbar/UserGreetings";
import MenuItem from "../Elements/MenuItem";

const NavbarLayout = () => {
  // const navigate = useNavigate();
  const { authUser, loading } = useSelector((state) => state.auth);

  return (
    <>
      <div className="hidden lg:flex bg-gray-200 text-sm justify-end gap-4 py-2 px-5">
        <MenuItem text="Cek Resi" to="/cek-resi" />
        <MenuItem text="Hubungi Kami" to="/contact-us" />
        <MenuItem text="Download Aplikasi" to="download-aplikasi" />
        <MenuItem text="Tentang Kami" to="about-us" />
        <MenuItem text="FAQ" to="faq" />
      </div>
      <div className="flex w-full items-center justify-between bg-white px-4 py-4 shadow-sm lg:justify-around lg:gap-3 ">
        {loading ? (
          <>
            <span className="animate-pulse bg-gray-200 text-xl font-semibold text-gray-200">
              Anugrah Hadi Electric
            </span>
            <div className="hidden h-12 w-1/2 animate-pulse bg-gray-200 text-gray-200 lg:block">
              search
            </div>
            <div className="h-8 w-28 animate-pulse bg-gray-200 text-slate-200 lg:h-8 lg:w-8">
              cart
            </div>
            <div className="hidden gap-2 lg:flex">
              <div className="animate-pulse bg-gray-200 px-6 py-5 text-gray-200">
                Button
              </div>
              <div className="animate-pulse bg-gray-200 px-6 py-5 text-gray-200">
                Button
              </div>
            </div>
          </>
        ) : (
          <>
            <span className="text-xl font-semibold text-primaryColor">
              Anugrah Hadi Electric
            </span>
            <div className="flex items-center justify-between gap-5 lg:w-1/2 lg:gap-10">
              <SearchBarMenu />

              <CartIcon itemCount={1} />
              <HamburgerMenu authUser={authUser} />
            </div>
            {authUser ? (
              <UserGreetings authUser={authUser} />
            ) : (
              <AuthButton className="hidden gap-2 lg:flex" />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default NavbarLayout;
