import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import InputSearch from "../InputSearch";
import SearchTermSuggestion from "../../Fragments/SearchTermSuggestion";
import { useDispatch } from "react-redux";
import {
  asyncSearchProducts,
  clearSearchTerm,
} from "../../../redux/searchTerm/action";
import Input from "../InputSearch/Input";

const DropdownSearch = () => {
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const toggleSearchBar = () => {
  
    setOpenSearchBar(!openSearchBar);
    document.body.classList.toggle("overflow-hidden");

    setSearch("");
    dispatch(clearSearchTerm());
  };

  const [debounceTimer, setDebounceTimer] = useState(null); 

  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value);

    // Clear previous timer jika ada
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Set timer baru
    const timer = setTimeout(() => {
      if (value) {
        dispatch(asyncSearchProducts(value, 5)); 
      }
    }, 300); 

    setDebounceTimer(timer);
  };

  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer, dispatch]);

  return (
    <div
      className=" flex cursor-pointer gap-0 rounded-lg px-2 lg:w-full lg:cursor-default lg:items-center lg:gap-1 lg:border lg:bg-white lg:px-2
    "
    >
      <CiSearch onClick={toggleSearchBar} className="h-6 w-6" />
      <Input
        onClick={toggleSearchBar}
        className={`hidden cursor-pointer border-none py-3 text-base outline-none lg:block`}
        type={"text"}
        value={search}
        placeholder="Cari produk yang anda inginkan..."
      />

      {openSearchBar && (
        <>
          <div
            className="fixed right-0 top-0 z-40 h-full w-full bg-black/50 backdrop-blur-sm "
            onClick={toggleSearchBar}
          ></div>
          <div className="fixed left-0 top-0 z-50 flex h-full w-full max-w-sm flex-col gap-5 bg-white overflow-hidden px-5 py-8 lg:absolute lg:left-1/2 lg:top-1/2 lg:h-[65%] lg:max-w-2xl lg:-translate-x-1/2 lg:-translate-y-1/2 lg:transform lg:py-5">
              <InputSearch
                onChange={handleChange}
                value={search}
                type={"text"}
                placeholder="Cari produk yang anda inginkan..."
              />
              <SearchTermSuggestion
                value={search}
                toggleSearchBar={toggleSearchBar}
                className={"relative overflow-auto custom-scrollbar min-h-full"}
              />
          </div>
        </>
      )}
    </div>
  );
};

export default DropdownSearch;
