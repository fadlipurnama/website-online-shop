import Label from "./Label";
import TextArea from "./TextArea";

const TextAreaForm = ({ name, label, placeholder, className, container }) => {
  return (
    <div className={`${container}`}>
      <Label name={name} label={label} />
      <TextArea
        name={name}
        placeholder={placeholder}
        className={`focus:shadow-outline w-full resize-none appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${className}`}
      />
    </div>
  );
};

export default TextAreaForm;
