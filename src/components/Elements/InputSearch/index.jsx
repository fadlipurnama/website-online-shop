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
}) => {
  return (
    <div
      className={`${openSearchBar ? "flex lg:hidden" : "hidden lg:flex"} w-full max-w-xl items-center gap-1 rounded-lg  border px-2 `}
    >
      <CiSearch className="h-6 w-6" onClick={onClick} />
      <Input
        className={`border-none py-3 text-base outline-none`}
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
