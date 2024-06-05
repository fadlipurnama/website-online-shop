const Label = ({ htmlFor, children, variant, value }) => {
    return (
        <label
        htmlFor={htmlFor}
        className={` ${!variant ? 'block md-2 mb-1 font-bold text-slate-700' : value?.length > 0 ? 'block px-3 font-light text-sm':'hidden' }`}
      >
        {children}
      </label>
    );
  };
  
  export default Label;