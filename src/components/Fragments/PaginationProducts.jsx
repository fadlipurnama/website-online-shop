// import { useFilterProduct } from "../../hooks/useFilterProduct";

const PaginationProducts = ({
  data,
  pageSize,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(data?.length / pageSize);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  
  const handlePrevPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <div className="my-10 flex justify-end">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={`mx-1 rounded bg-gray-200 px-4 py-2 ${
          currentPage !== 1 && "hover:bg-gray-300"
        }`}
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={`mx-1 rounded px-4 py-2 ${
            index + 1 === currentPage
              ? "bg-primaryColor text-white"
              : "bg-white"
          }`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`mx-1 rounded bg-gray-200 px-4 py-2 ${
          currentPage !== totalPages && "hover:bg-gray-300"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationProducts;
