const TextArea = ({
  name,
  disabled = false,
  placeholder,
  value,
  className,
  maxLength,
  onChange = () => {},
}) => {
  return (
    <textarea
      onChange={onChange}
      name={name}
      value={value}
      disabled={disabled}
      maxLength={maxLength}
      placeholder={placeholder}
      className={`focus:shadow-outline w-full resize-none appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${className}`}
    ></textarea>
  );
};

export default TextArea;
