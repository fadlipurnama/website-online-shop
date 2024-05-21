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
  value
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
        className={`focus:shadow-outline w-full resize-none appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${className}`}
      />
    </div>
  );
};

export default TextAreaForm;
