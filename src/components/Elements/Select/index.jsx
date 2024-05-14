import Label from "./Label";
import Select from "./.Select";

const SelectForm = ({
  name,
  label,
  placeholder,
  required,
  className,
  onChange,
  container,
  options,
}) => {
  return (
    <div className={`${container}`}>
      <Label htmlFor={name}>{label}</Label>
      <Select
        options={options}
        name={name}
        placeholder={placeholder}
        required={required}
        className={className}
        onChange={onChange}
      />
    </div>
  );
};

export default SelectForm;
