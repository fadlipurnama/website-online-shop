import Input from "./Input";
import Label from "./Label";

const InputForm = ({
  name,
  label,
  type,
  placeholder,
  required,
  value,
  maxLength,
  className,
  onChange,
  container,
  disabled,
}) => {
  return (
    <div className={`${container}`}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input
        name={name}
        type={type}
        disabled={disabled}
        maxLength={maxLength}
        placeholder={placeholder}
        required={required}
        className={className}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default InputForm;
