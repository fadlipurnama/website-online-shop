import { CiSearch } from "react-icons/ci";
import Input from "./Input";

const InputSearch = ({
  onClick = () => {},
  openSearchBar,
  maxLength,
  type,
  name,
  value,
  required,
  onChange,
  disabled,
  placeholder,
  container,
  defaultElement,
  className,
}) => {
  return (
    <div
      className={`${openSearchBar ? "flex lg:hidden" : `${defaultElement ? "flex" : "hidden lg:flex"}`} w-full ${container} items-center gap-1 rounded-lg border  bg-white px-2 `}
    >
      <CiSearch className="h-6 w-6" onClick={onClick} />
      <Input
        className={`border-none  py-3 ${className} text-base outline-none`}
        maxLength={maxLength}
        type={type}
        disabled={disabled}
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        min="0"
      />
    </div>
  );
};

export default InputSearch;
