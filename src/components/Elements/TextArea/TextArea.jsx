const TextArea = ({ name, placeholder, className}) => {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${className}`}
    ></textarea>
  );
};

export default TextArea;
