import Label from "./Label";
import Input from "./Input";

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
    <div className={`mb-6 ${container}`}>
      <Label htmlFor={name}>{label}</Label>
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
