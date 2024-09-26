import { useEffect, useRef, useState } from "react";
import ButtonSelectCustom from "./ButtonSelectCustom";
import DropdownOptions from "./DropdownOptions";

const SelectCustom = ({
  label,
  name,
  placeholder,
  className,
  required = false,
  options,
  classNameContainer,
  value = "",
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

  const handleOptionClick = (optionValue) => {
    setSelectedOption(optionValue);
    setIsOpen(false);
    onChange({ target: { name, value: optionValue } });
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
          onChange({ target: { name, value: matchedOption.value } });
        }

        clearTimeout(bufferTimeout.current);
        bufferTimeout.current = setTimeout(() => {
          charBuffer.current = "";
        }, 1000);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(bufferTimeout.current);
    };
  }, [isOpen, options, onChange, name]);

  return (
    <div className={`${classNameContainer} relative w-full`} ref={dropdownRef}>
      <ButtonSelectCustom
        handleToggle={handleToggle}
        label={label}
        selectedOption={selectedOption}
        required={required}
        disabled={disabled}
        className={className}
        selectedLabel={selectedLabel}
      />
      {isOpen && (
        <DropdownOptions
          classNameOption={classNameOption}
          handleOptionClick={handleOptionClick}
          options={options}
          selectedOption={selectedOption}
        />
      )}
    </div>
  );
};

export default SelectCustom;
