import Label from "./Label";
import TextArea from "./TextArea";

const TextAreaForm = ({
  name,
  label,
  placeholder,
  className,
  container,
  onChange,
  maxLength,
  disabled,
  error,
  value,
}) => {
  return (
    <div className={`${container}`}>
      <Label name={name} label={label} />
      <TextArea
        onChange={onChange}
        name={name}
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        className={className}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default TextAreaForm;
