import Label from "./Label";
import Select from "./SelectElement";

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
  value,
}) => {
  return (
    <div className={`${container} w-full`}>
      <Label htmlFor={name}>{label}</Label>
      <Select
        options={options}
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
