import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import InputSearch from "../Elements/InputSearch";
import CartIcon from "../Elements/CartIcon";
import DropdownSearch from "../Elements/DropdownSearch";
import DropdownUser from "../Elements/DropdownUser";
import HamburgerMenu from "../Elements/HamburgerMenu";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { authUser, loading } = useSelector((state) => state.auth);
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`z-50 w-full shadow-sm transition-all duration-300 ${isSticky && "sticky top-0 bg-white"}`}
      >
        <nav
          className={`hidden items-center justify-between gap-4 bg-gray-100 px-6 py-2 text-sm lg:flex ${loading ? "animate-pulse" : ""}`}
        >
          <div className="flex gap-4">
            {["Download Aplikasi", "Hubungi Kami", "Tentang Kami"].map(
              (text, index) => (
                <Link
                  key={index}
                  to={`/${text.toLowerCase().replace(/\s+/g, "-")}`}
                  className={
                    loading
                      ? "bg-gray-200 text-transparent"
                      : "hover:text-primaryColor"
                  }
                >
                  {text}
                </Link>
              ),
            )}
            <Link
              to={`/user-profile/${authUser?._id}/wishlist`}
              className={
                loading
                  ? "bg-gray-200 text-transparent"
                  : "hover:text-primaryColor"
              }
            >
              Wishlist
            </Link>
          </div>
          {!authUser && (
            <div className="flex gap-4 font-semibold">
              <Link
                to="/login"
                className={
                  loading
                    ? "bg-gray-200 text-transparent"
                    : "hover:text-primaryColor"
                }
              >
                Masuk
              </Link>
              <Link
                to="/register"
                className={
                  loading
                    ? "bg-gray-200 text-transparent"
                    : "hover:text-primaryColor"
                }
              >
                Daftar
              </Link>
            </div>
          )}
        </nav>

        <div
          className={`top-0 flex flex-wrap items-center transition-all duration-300 ${!isSticky && "bg-white"} justify-between px-2 py-3 lg:gap-4 lg:px-6 2xl:flex-nowrap ${loading ? "animate-pulse" : ""}`}
        >
          <span
            onClick={() => navigate("/")}
            className={`cursor-pointer text-base font-semibold md:text-lg lg:text-xl ${loading ? "bg-gray-200 text-transparent" : "text-primaryColor"}`}
          >
            Anugrah Hadi Electric
          </span>
          <div className="order-2 flex max-w-lg items-center justify-between gap-2 sm:gap-4 md:gap-5 lg:w-full">
            {loading ? (
              <>
                <div className="hidden h-12 w-1/2 bg-gray-200 lg:block"></div>
                <div className="hidden h-8 w-8 bg-gray-200 lg:block"></div>
                <div className="hidden h-8 w-28 bg-gray-200 lg:block"></div>
                <div className="h-8 w-8 bg-gray-200 lg:block"></div>
              </>
            ) : (
              <>
                <InputSearch placeholder="Search..." />
                <DropdownSearch />
                {authUser && (
                  <DropdownUser
                    authUser={authUser}
                    dropdownPosition="right-0 top-10"
                  />
                )}
                <CartIcon authUser={authUser} />
                <HamburgerMenu authUser={authUser} />
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
