import Input from "./Input";
import Label from "./Label";

const InputForm = ({
  name,
  label,
  type,
  placeholder,
  required,
  className,
  onChange,
  container,
}) => {
  return (
    <div className={`${container}`}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className={className}
        onChange={onChange}
      />
    </div>
  );
};

export default InputForm;
