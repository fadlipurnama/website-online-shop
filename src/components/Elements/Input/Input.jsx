const Input = ({
  type,
  name,
  placeholder,
  required = false,
  className,
  value,
  onChange = () => {},
  maxLength,
  variant,
  error,
  disabled = false,
}) => {
  return (
    <input
      maxLength={maxLength}
      type={type}
      disabled={disabled}
      name={name}
      value={value}
      placeholder={error ? error : placeholder}
      className={`w-full px-3 outline-none ${!variant && `${error ? "border border-red-500" : "focus:shadow-outline rounded border leading-tight focus:outline-none focus:ring-2 focus:ring-primaryColor"}`} text-slate-700 ${error ? "placeholder:text-red-500" : "placeholder:opacity-90 "} ${className}
      `}
      required={required}
      onChange={onChange}
      min="0"
    />
  );
};

export default Input;
