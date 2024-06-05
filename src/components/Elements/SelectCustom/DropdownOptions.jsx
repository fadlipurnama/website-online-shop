const DropdownOptions = ({
  classNameOption,
  handleOptionClick,
  options,
  selectedOption,
}) => {
  return (
    <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded border border-gray-300 bg-white shadow-lg">
      {options?.map((option, index) => (
        <li
          key={index}
          onClick={() => handleOptionClick(option.value)}
          className={`${classNameOption} cursor-pointer px-4 py-2 text-gray-700 hover:bg-secondaryColor hover:text-white ${selectedOption === option.value ? "bg-secondaryColor text-white" : ""}`}
        >
          {option.label}
        </li>
      ))}
    </ul>
  );
};

export default DropdownOptions;
