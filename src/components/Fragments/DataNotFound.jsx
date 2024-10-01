import dataNotFound from "../../assets/data-not-found.jpg";

const DataNotFound = ({className, description, title}) => {
  return (
    <div className={`flex ${className} className m-auto min-h-[68vh] flex-col items-center justify-center`}>
      <img src={dataNotFound} className="h-40 w-40 lg:h-60 lg:w-60" />
      <h1 className="text-xl lg:text-3xl text-center text-slate-800 font-bold">{title}</h1>
      <p className="my-3 text-slate-600 lg:text-xl">
        {description}
      </p>
    </div>
  );
};

export default DataNotFound;
