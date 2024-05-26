import { useEffect, useRef, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";

const SelectElement = ({
  name,
  placeholder,
  className,
  required = false,
  options,
  value = "",
  disabled = false,
  classNameOption,
  onChange = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value);
  const dropdownRef = useRef();

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (optionValue) => {
    setSelectedOption(optionValue);
    setIsOpen(false);
    onChange({ target: { name, value: optionValue } });
  };

  const selectedLabel =
    options.find((option) => option.value === selectedOption)?.label ||
    placeholder;

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className={`relative w-full bg-white ${disabled && "cursor-not-allowed opacity-50"}`}
      ref={dropdownRef}
    >
      <button
        type="button"
        onClick={handleToggle}
        className={`w-full border px-3 py-2 text-slate-700 placeholder:opacity-60 ${className} focus:shadow-outline leading-tight focus:outline-none`}
        required={required}
        disabled={disabled}
      >
        {selectedLabel}
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
          <TiArrowSortedDown className="h-4 w-4 fill-current" />
        </span>
      </button>
      {isOpen && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded border border-gray-300 bg-white">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option.value)}
              className={`${classNameOption} cursor-pointer bg-white px-4 py-2 text-gray-700 hover:bg-gray-100`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectElement;
