const Pagination = ({
  data,
  currentPage,
  itemsPerPage,
  setCurrentPage,

}) => {
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  return (
    <div className="mt-4 flex justify-center">
      <button
        className="mr-2 rounded-md bg-gray-200 px-4 py-2 text-gray-700"
        onClick={prevPage}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {Array.from({ length: Math.ceil(data?.length / itemsPerPage) }).map(
        (_, index) => (
          <button
            key={index}
            className={`mr-2 rounded-md px-4 py-2 ${
              currentPage === index + 1
                ? "bg-primaryColor text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ),
      )}
      <button
        className="ml-2 rounded-md bg-gray-200 px-4 py-2 text-gray-700"
        onClick={nextPage}
        disabled={currentPage === Math.ceil(data?.length / itemsPerPage)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
