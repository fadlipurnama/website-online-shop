import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import InputSearch from "../InputSearch";

const DropdwonSearch = () => {
  const [openSearchBar, setOpenSearchBar] = useState(false);

  const toggleSearchBar = () => {
    if (window.innerWidth < 1024) {
      setOpenSearchBar(!openSearchBar);
      document.body.classList.toggle("overflow-hidden");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (innerWidth > 1024) {
        setOpenSearchBar(false);
        document.body.classList.remove("overflow-hidden");
      }
    };
    handleResize();
    addEventListener("resize", handleResize);
    return () => removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="lg:hidden cursor-pointer gap-0 rounded-lg flex lg:w-full lg:cursor-default lg:items-center lg:gap-1 lg:border lg:px-2">
      <CiSearch onClick={toggleSearchBar} className="h-6 w-6" />
      <>
        {/* Search Bar Dropdown */}
        {openSearchBar && (
          <>
            <div
              className="fixed right-0 top-0 z-10 h-full w-full bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={toggleSearchBar}
            ></div>
            <div className="fixed left-0 top-0 z-20 flex h-full w-full max-w-sm flex-col gap-5 bg-white px-5 py-8 lg:hidden">
              <InputSearch openSearchBar={openSearchBar} placeholder='Ssearch...'/>
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default DropdwonSearch;
