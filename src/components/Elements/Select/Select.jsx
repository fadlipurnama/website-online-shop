const Select = ({
  name,
  placeholder,
  className,
  required = false,
  options,
  value = "",
  disabled = false,
  variant,
  error,
  onChange = () => {},
}) => {
  return (
    <select
      name={name}
      placeholder={placeholder}
      className={`w-full px-2 outline-none ${!variant && "py-2 focus:shadow-outline rounded border-2 leading-tight focus:outline-none focus:ring-2 focus:ring-primaryColor"} ${error && value?.length === 0 ? "text-red-500" : "text-gray-800"} ${!value?.length > 0 &&  "py-4"} placeholder:opacity-60 ${className}`}
      required={required}
      disabled={disabled}
      value={value}
      onChange={onChange}
    >
      <option className={error && "text-red-500"} value="" hidden>
        {error ? error : placeholder}
      </option>
      {options &&
        options.map((option, index) => (
          <option key={index} className="text-gray-800" value={option.value}>
            {option.label}
          </option>
        ))}
    </select>
  );
};

export default Select;
