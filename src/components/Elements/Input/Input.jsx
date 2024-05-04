const Input = ({
  type,
  name,
  placeholder,
  required = false,
  className,
  onChange = () => {},
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className={`w-full border px-3 text-slate-700 placeholder:opacity-60 ${className} focus:shadow-outline leading-tight focus:outline-none`}
      required={required}
      onChange={onChange}
      min={0}
    />
  );
};

export default Input;
