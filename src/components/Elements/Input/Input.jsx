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
      className={` w-full border px-3 text-slate-700 placeholder:opacity-60 ${className}`}
      required={required}
      onChange={onChange}
    />
  );
};

export default Input;
