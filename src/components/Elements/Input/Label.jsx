const Label = ({ htmlFor, children }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`md-2 mb-1 block font-bold text-slate-700`}
    >
      {children}
    </label>
  );
};

export default Label;
