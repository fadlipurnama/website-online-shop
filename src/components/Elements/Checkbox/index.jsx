const Checkbox = ({
  disabled = false,
  onChange = () => {},
  checked,
  name,
  label,
}) => {
  return (
    <div className="flex items-center gap-5 space-x-2">
      <span className="text-md font-bold text-gray-700">{label}</span>
      <label className="relative inline-flex max-w-max cursor-pointer items-center">
        <input
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="peer sr-only"
        />
        <div
          className={`peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primaryColor peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primaryColor`}
        ></div>
        <span className="ml-3 text-gray-700">{checked ? "Aktif" : "Nonaktif"}</span>
      </label>
    </div>
  );
};

export default Checkbox;
