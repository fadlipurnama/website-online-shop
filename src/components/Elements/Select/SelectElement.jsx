const Select = ({
  name,
  placeholder,
  className,
  required = false,
  options,
  value = "",
  disabled = false,
  onChange = () => {},
}) => {
  return (
    <select
      name={name}
      className={`w-full border px-3 text-slate-700 placeholder:opacity-60 ${className} focus:shadow-outline leading-tight focus:outline-none`}
      required={required}
      disabled={disabled}
      value={value}
      onChange={onChange}
    >
      <option value="">{placeholder}</option>
      {options &&
        options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
    </select>
  );
};

export default Select;
