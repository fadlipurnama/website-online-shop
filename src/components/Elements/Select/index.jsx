import Label from "./Label";
import Select from "./Select";

const SelectForm = ({
  name,
  label,
  placeholder,
  required,
  className,
  disabled,
  onChange,
  container,
  options,
  variant,
  error,
  value,
}) => {
  return (
    <div
      className={`pr-4 ${container} ${variant && `bg-white rounded border-2 ${error ? "border-red-500 leading-tight" : " leading-tight focus-within:ring-2 focus-within:ring-primaryColor"} ${value?.length > 0 &&  "py-2"} `}`}
    >
      {label && (
        <Label value={value} variant={variant} htmlFor={name}>
          {label}
        </Label>
      )}
      <Select
        error={error}
        options={options}
        variant={variant}
        name={name}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        required={required}
        className={className}
        onChange={onChange}
      />
    </div>
  );
};

export default SelectForm;
