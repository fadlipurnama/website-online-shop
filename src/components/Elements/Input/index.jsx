import { useState } from "react";
import Input from "./Input";
import Label from "./Label";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";

const InputForm = ({
  name,
  label,
  type,
  placeholder,
  required,
  value,
  maxLength,
  className,
  onChange,
  container,
  disabled,
  error,
  variant = false,
}) => {
  const [openEyes, setOpenEyes] = useState(false);

  return (
    <>
      <div
        className={`${container} ${type === "password" ? "relative" : ""} ${variant && `border bg-white  ${error ? "border-red-500 leading-tight" : " leading-tight focus-within:ring-2 focus-within:ring-primaryColor"}  ${value?.length > 0 ? "py-2" : "py-4"}`}`}
      >
        {label && (
          <Label value={value} variant={variant} htmlFor={name}>
            {label}
          </Label>
        )}
        <Input
          variant={variant}
          name={name}
          error={error}
          type={openEyes ? "text" : type}
          disabled={disabled}
          maxLength={maxLength}
          placeholder={placeholder}
          required={required}
          className={className}
          onChange={onChange}
          value={value}
        />
        {type === "password" && openEyes ? (
          <IoEyeOutline
            onClick={() => setOpenEyes(false)}
            className={`${type === "password" ? "block" : "hidden"} absolute right-2 h-6 w-6 ${variant ? "top-1/2 -translate-y-1/2" : "top-1/2"} cursor-pointer md:h-7 md:w-7 lg:h-8 lg:w-8`}
          />
        ) : (
          <IoEyeOffOutline
            onClick={() => setOpenEyes(true)}
            className={`${type === "password" ? "block" : "hidden"} absolute right-2 h-6 w-6 ${variant ? "top-1/2 -translate-y-1/2" : "top-1/2"} cursor-pointer md:h-7 md:w-7 lg:h-8 lg:w-8`}
          />
        )}
      </div>
    </>
  );
};

export default InputForm;
