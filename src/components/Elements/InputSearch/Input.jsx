const Input = ({
  onClick = () => {},
  type,
  name,
  placeholder,
  required = false,
  className,
  value,
onChange = () => {},
  maxLength,
  disabled = false,
}) => {
  return (
    <input
      maxLength={maxLength}
      type={type}
      disabled={disabled}
      name={name}
      value={value}
      placeholder={placeholder}
      className={`w-full px-3 text-slate-700 placeholder:opacity-60 ${className} focus:shadow-outline rounded border
         leading-tight focus:outline-none
        `}
      onClick={onClick}
      required={required}
      onChange={onChange}
      min="0"
    />
  );
};

export default Input;
