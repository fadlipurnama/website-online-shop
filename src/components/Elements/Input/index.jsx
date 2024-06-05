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
  error,
  variant = false,
}) => {
  return (
    <>
      <div
        className={`${container} ${variant && `border bg-white  ${error ? "border-red-500 leading-tight" : " leading-tight focus-within:ring-2 focus-within:ring-primaryColor"}  ${value?.length > 0 ? "py-2" : "py-4"}`}`}
      >
        {label && (
          <Label value={value} variant={variant} htmlFor={name}>
            {label}
          </Label>
        )}
        <Input
          variant={variant}
          name={name}
          error={error}
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
    </>
  );
};

export default InputForm;
