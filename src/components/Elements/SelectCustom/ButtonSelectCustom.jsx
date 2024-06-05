import { TiArrowSortedDown } from "react-icons/ti";

const ButtonSelectCustom = ({
  selectedOption,
  handleToggle,
  label,
  required,
  disabled,
  className,
  selectedLabel,
}) => {
  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`w-full border bg-white px-3 ${selectedOption? 'py-2' : 'py-4'} text-left text-slate-700 placeholder-gray-400 ${className} focus:shadow-outline items-center justify-between leading-tight focus:outline-none`}
      required={required}
      disabled={disabled}
    >
      <span
        className={`font-light text-xs sm:text-sm ${selectedOption ? "block" : "hidden"}`}
      >
        {label}
      </span>
      <span className="flex text-sm sm:text-base items-center justify-between">
        {selectedLabel}
        <TiArrowSortedDown className="ml-2 h-4 w-4 fill-current" />
      </span>
    </button>
  );
};

export default ButtonSelectCustom;
