import { useState } from "react";

const DropdownNotification = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-gray-600 transition duration-300 ease-in-out hover:text-primary"
      >
        <svg
          className="fill-current"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M10 1.66675C5.39783 1.66675 1.66667 5.39792 1.66667 10.0001C1.66667 14.6022 5.39783 18.3334 10 18.3334C14.6022 18.3334 18.3333 14.6022 18.3333 10.0001C18.3333 5.39792 14.6022 1.66675 10 1.66675ZM9.16667 13.3334V11.6667H10.8333V13.3334H9.16667ZM10.8333 10.0001H9.16667V5.83341H10.8333V10.0001Z"
            fill="currentColor"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 shadow-lg rounded-md">
          <div className="px-4 py-2 text-sm text-gray-700">
            <p>No new notifications</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownNotification;
