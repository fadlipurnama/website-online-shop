import { useState } from "react";

const CourierSelect = ({ couriers, selectedCourier, setSelectedCourier }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (courier) => {
    setSelectedCourier(courier);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between outline-none items-center w-full p-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span>{selectedCourier ? selectedCourier.name : "Pilih Kurir"}</span>
        <svg
          className={`w-4 h-4 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 10l5 5 5-5H7z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          {couriers.map((courier) => (
            <button
              key={courier.code}
              onClick={() => handleSelect(courier)}
              className="flex items-center justify-between w-full p-2 text-left hover:bg-blue-100 focus:outline-none"
            >
              <span>{courier.name}</span>
              {selectedCourier?.code === courier.code && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourierSelect;
