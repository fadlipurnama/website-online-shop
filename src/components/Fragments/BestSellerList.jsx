import { useSelector } from "react-redux";
import CardProduct from "../Elements/CardProduct";
import { useNavigate } from "react-router-dom";

const BestSellerList = () => {
  const { products } = useSelector((states) => states.products);
  const navigate = useNavigate();

  return (
    <div className="m-auto mb-10 max-w-[85%] rounded-lg bg-white p-2 shadow-lg lg:px-9 lg:py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-md mb-5 font-semibold md:text-2xl">Best Seller</h2>
        <span
          onClick={() => navigate(`/products/best-seller`)}
          className="cursor-pointer text-primaryColor"
        >
          See All
        </span>
      </div>
      <div className="flex items-center gap-2 overflow-x-auto pb-5 lg:gap-6">
        {products
          ? products
              .filter((item) => item.best === true)
              .map((product) => (
                <CardProduct key={product._id}>
                  <CardProduct.Header
                    image={product.imageUrl}
                    title={product.name}
                  />
                  <CardProduct.Footer price={product.price} />
                </CardProduct>
              ))
          : //   Loading
            Array.from({ length: 8 }, (_, index) => (
              <CardProduct key={index}>
                <CardProduct.Header />
                <CardProduct.Footer />
              </CardProduct>
            ))}
      </div>
    </div>
  );
};

export default BestSellerList;
