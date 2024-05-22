import { useDispatch, useSelector } from "react-redux";
import DefaultLayoutPage from "../components/Layouts/DefaultLayoutPage";
import { useEffect, useState } from "react";
import { asyncSetProducts } from "../redux/products/action";
import { useParams } from "react-router-dom";
import CardProduct from "../components/Elements/CardProduct";

const ProductCategoriesPage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((states) => states.products);
  const { categories } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    dispatch(asyncSetProducts());
  }, [dispatch]);

  const filterProduct = products?.filter((item) => item.best === true);

  const totalPages = Math.ceil(filterProduct?.length / pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const selectedProducts = filterProduct?.slice(
    startIndex,
    startIndex + pageSize,
  );

    const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <DefaultLayoutPage>
      <div className="mx-auto my-10 flex w-[85%] max-w-max flex-wrap items-center gap-2 lg:gap-6">
        {selectedProducts?.length > 0
          ? selectedProducts.map((product) => (
              <CardProduct key={product._id} id={product._id}>
                <CardProduct.Header
                  image={product.imageUrl}
                  title={product.name}
                />
                <CardProduct.Body category={product.category}>
                  {product.description}
                </CardProduct.Body>
                <CardProduct.Footer price={product.price} />
              </CardProduct>
            ))
          : // Loading
            Array.from({ length: pageSize }, (_, index) => (
              <CardProduct key={index}>
                <CardProduct.Header />
                <CardProduct.Body></CardProduct.Body>
                <CardProduct.Footer />
              </CardProduct>
            ))}
      </div>
      {/* <div className="mb-10 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 rounded px-4 py-2 ${
              index + 1 === currentPage
                ? "bg-primaryColor text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div> */}

<div className="flex justify-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 rounded bg-gray-200"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 rounded ${
              index + 1 === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 rounded bg-gray-200"
        >
          Next
        </button>
      </div>
    </DefaultLayoutPage>
  );
};

export default ProductCategoriesPage;
