const Label = ({ label, name }) => {
  return (
    <label
      className="mb-2 block font-bold text-gray-700"
      htmlFor={name}
    >
      {label}
    </label>
  );
};

export default Label;
