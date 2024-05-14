const ProductContainer = ({ children, title }) => {
  return (
    <div className="m-auto mb-10 max-w-[85%] overflow-x-hidden rounded-lg bg-white p-2 shadow-lg lg:px-9 lg:py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-md mb-5 font-semibold md:text-2xl">{title}</h2>
        <p className="text-primaryColor">See All</p>
      </div>
      <div className="flex items-center gap-2 overflow-x-auto pb-5 lg:gap-6">
        {children}
      </div>
    </div>
  );
};

export default ProductContainer;
