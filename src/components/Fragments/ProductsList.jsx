import { useSelector } from "react-redux";
import CardProduct from "../Elements/CardProduct";

const ProductList = () => {
  const { products } = useSelector((states) => states.products);

  return (
    <div className="m-auto mb-10 max-w-[85%] rounded-lg bg-white p-2 shadow-lg lg:px-9 lg:py-4">
      <h2 className="text-md mb-5 font-semibold md:text-2xl">Product</h2>
      <div className="flex max-w-max flex-wrap items-center justify-center gap-2 lg:gap-6">
        {products
          ? products.slice(0, 8).map((product) => (
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
          :
          // Loading
          Array.from({ length: 8 }, (_, index) => (
              <CardProduct key={index}>
                <CardProduct.Header />
                <CardProduct.Body></CardProduct.Body>
                <CardProduct.Footer />
              </CardProduct>
            ))}
      </div>
    </div>
  );
};

export default ProductList;
