import { useEffect, useRef, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";

const ShippingOptionSelect = ({
  label,
  name,
  placeholder,
  className,
  setShippingCost,
  required = false,
  options,
  classNameContainer,
  value = "",
  originCityName = "",
  weightOrder,
  disabled = false,
  classNameOption,
  onChange = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value);
  const dropdownRef = useRef();
  const charBuffer = useRef("");
  const bufferTimeout = useRef(null);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option.value);
    setIsOpen(false);
    onChange({ target: { name, value: option } });
    option;
    setShippingCost(option ? option?.value.cost[0].value : 0);
  };

  const selectedLabel =
    options?.find((option) => option.value === selectedOption)?.label ||
    placeholder;

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isOpen && /^[a-zA-Z0-9]$/.test(event.key)) {
        charBuffer.current += event.key.toLowerCase();

        if (charBuffer.current.length > 3) {
          charBuffer.current = charBuffer.current.slice(-3);
        }

        const matchedOption = options.find((option) =>
          option.label.toLowerCase().startsWith(charBuffer.current),
        );

        if (matchedOption) {
          setSelectedOption(matchedOption.value);
          onChange({ target: { name, value: matchedOption } });
        }

        clearTimeout(bufferTimeout.current);
        bufferTimeout.current = setTimeout(() => {
          charBuffer.current = "";
        }, 1000);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    if (selectedLabel === placeholder) {
      setSelectedOption("");
      setShippingCost(0);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(bufferTimeout.current);
    };
  }, [
    isOpen,
    options,
    onChange,
    name,
    selectedLabel,
    placeholder,
    setShippingCost,
  ]);

  return (
    <div className={`${classNameContainer} relative w-full`} ref={dropdownRef}>
      <button
        type="button"
        onClick={handleToggle}
        className={`w-full border bg-white px-3 ${selectedOption ? "py-2" : "py-4"} text-left text-slate-700 placeholder-gray-400 ${className} focus:shadow-outline items-center justify-between leading-tight focus:outline-none`}
        required={required}
        disabled={disabled}
      >
        <span
          className={`text-xs font-light sm:text-sm ${selectedOption ? "block" : "hidden"}`}
        >
          {label}
        </span>
        <span className="flex w-full items-center justify-between text-sm sm:text-base">
          <p>{selectedLabel}</p>
          <span className="flex gap-2">
            {selectedOption !== "" && (
              <p className="font-semibold">
                Estimasi {""}
                {selectedOption?.cost[0].etd.replace(/hari/gi, "").trim()} Hari
              </p>
            )}
            {selectedOption !== "" && (
              <p className="font-semibold">
                {"("}
                {selectedOption?.cost[0].value
                  ?.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })
                  .replace(/,00$/, "")}
                {")"}
              </p>
            )}
          </span>

          <TiArrowSortedDown
            className={`${selectedOption !== "" ? "hidden" : "block"} ml-2 h-4 w-4 fill-current`}
          />
        </span>
      </button>
      {isOpen && (
        <div className="custom-scrollbar mt-1 flex max-h-60 w-full flex-col gap-2 overflow-auto rounded border border-gray-300 bg-white px-4 py-2 shadow-lg">
          <div className="flex items-center justify-between rounded-lg border px-2 py-1">
            <h3 className="text-slate-500">Dikirim dari {originCityName}</h3>
            <h3 className="font-semibold text-primaryColor">
              Berat {weightOrder}
            </h3>
          </div>
          <ul className="flex flex-col gap-2">
            {options?.map((option, index) => (
              <li
                key={index}
                onClick={() => {
                  handleOptionClick(option);
                }} // Ambil seluruh objek option
                className={`${classNameOption} flex cursor-pointer justify-between rounded-lg p-2 text-gray-700 hover:bg-gray-200 ${selectedOption === option.value ? "bg-gray-200" : ""}`} // Perbaiki perbandingan dengan option.value
              >
                <div>
                  <p className="font-semibold">{option.label}</p>
                  <p className="text-sm font-light">
                    {option.service} - Estimasi:{" "}
                    {option.estimasi.replace(/hari/gi, "").trim()} Hari
                  </p>
                </div>
                <p className="font-semibold">
                  {option.price
                    ?.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                    .replace(/,00$/, "")}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ShippingOptionSelect;
