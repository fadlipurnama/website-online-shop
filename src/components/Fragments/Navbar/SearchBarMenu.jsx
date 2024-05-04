import { CiSearch } from "react-icons/ci";
import Input from "../../Elements/Input/Input";
import { useEffect, useState } from "react";

const SearchBarMenu = () => {
  const [openSearch, setOpenSearch] = useState(false);

  const toggleSearchBar = () => {
    if (window.innerWidth < 1024) {
      setOpenSearch(!openSearch);
      document.body.classList.toggle("overflow-hidden");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (innerWidth > 1024) {
        setOpenSearch(false);
      }
    };
    handleResize();
    addEventListener("resize", handleResize);
    return () => removeEventListener("resize", handleResize);
  }, []);
  
  return (
    <div className="block cursor-pointer gap-0 rounded-lg lg:flex lg:w-full lg:cursor-default lg:items-center lg:gap-1 lg:border lg:px-2">
      <CiSearch onClick={toggleSearchBar} className="h-6 w-6" />
      <Input
        placeholder="Search..."
        className="text-md hidden border-none py-3 outline-none lg:block lg:text-base"
      />
      <>
        {/* Search Bar Dropdown */}
        {openSearch && (
          <>
            <div
              className="fixed right-0 top-0 z-10 h-full w-full bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={toggleSearchBar}
            ></div>
            <div className="fixed left-0 top-0 z-20 flex h-full w-full max-w-sm flex-col gap-5 bg-white px-5 py-8 lg:hidden">
              <div className="flex items-center gap-1 rounded-lg border px-2">
                <CiSearch className="h-6 w-6" />
                <Input
                  placeholder="Search..."
                  className="border-none py-3 text-base outline-none"
                />
              </div>
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default SearchBarMenu;
