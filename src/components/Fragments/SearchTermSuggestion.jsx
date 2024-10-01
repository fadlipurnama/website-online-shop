import { useSelector } from "react-redux";
import LazyImage from "../Elements/LazyImage";
import { useNavigate } from "react-router-dom";

const  SearchTermSuggestion = ({ className, toggleSearchBar, value }) => {
  const { suggestions, loading, error } = useSelector(
    (state) => state.searchTerm,
  ); // Sesuaikan dengan nama reducer Anda
  const navigate = useNavigate();

  return (
    <div className={`${className}`}>
      {loading && <div className="absolute">Loading...</div>}
      {error && <div className="absolute text-red-500">{error}</div>}
      {suggestions && (
        <ul className="absolute z-10 mt-1 flex w-full flex-col gap-2 rounded bg-white">
          <div
            onClick={() => {
              navigate(`/products?search=${value}`);
            }}
            className="flex cursor-pointer gap-2 p-2 hover:bg-gray-200"
          >
            {value}
          </div>
          {suggestions.length > 0 ? (
            suggestions.map((suggestion) => (
              <li
                key={suggestion._id}
                onClick={() => {
                  navigate(`/products/all-products/${suggestion._id}`);
                  toggleSearchBar();
                }}
                className="flex cursor-pointer gap-2 border p-2 hover:bg-gray-200"
              >
                <LazyImage src={suggestion.imageUrl} className={"h-10 w-10"} />
                <p className="text-sm">{suggestion.name}</p>
              </li>
            ))
          ) : (
            <div
              onClick={() => {
                navigate(`/products?search=${value}`);
                toggleSearchBar();
              }}
              className="flex cursor-pointer gap-2 p-2 hover:bg-gray-200"
            >
              {value}
            </div>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchTermSuggestion;
