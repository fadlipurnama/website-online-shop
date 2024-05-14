import { useDispatch, useSelector } from "react-redux";
import CardCategories from "../components/Fragments/CardCategories";
import CardProduct from "../components/Fragments/CardProduct";
import NavbarLayout from "../components/Layouts/NavbarLayout";
import { useEffect } from "react";
import { asyncSetProducts } from "../redux/products/action";

const HomePage = () => {
  const dispatch = useDispatch();

  const { products, message, loading } = useSelector(
    (states) => states.products,
  );

  console.log(products);
  console.log("message: ", message);
  console.log("loading: ", loading);

  useEffect(() => {
    dispatch(asyncSetProducts());
  }, [dispatch]);
  return (
    <div>
      <NavbarLayout />
      <div className="">
        <div className="m-auto my-10 h-60 max-w-[85%] animate-pulse bg-primaryColor">
          Banner
        </div>

        <div className="m-auto mb-10 hidden max-w-[85%] rounded-lg bg-white px-9 py-4 shadow-lg lg:block">
          <h2 className="mb-5 font-semibold">Categories</h2>
          <div className="mx-auto flex max-w-min items-center gap-6">
            <CardCategories imageUrl="asdasdasd">MCB</CardCategories>
            <CardCategories imageUrl="asdasdasd">Conector</CardCategories>
            <CardCategories imageUrl="asdasdasd">Kabel</CardCategories>
            <CardCategories imageUrl="asdasdasd">Barang</CardCategories>
          </div>
        </div>
      </div>

      <div className="m-auto mb-10 max-w-[85%] rounded-lg bg-white p-2 shadow-lg lg:px-9 lg:py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-md mb-5 font-semibold md:text-2xl">
            Best Seller
          </h2>
          <p className="text-primaryColor">See All</p>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-5 lg:gap-6">
          {products &&
            products
              .filter((item) => item.best === true)
              .map((product) => (
                <CardProduct key={product._id}>
                  <CardProduct.Header
                    image={product.imageUrl}
                    title={product.name}
                  />
                  <CardProduct.Footer price={product.price} />
                </CardProduct>
              ))}
        </div>
      </div>

      <div className="m-auto mb-10 max-w-[85%] rounded-lg bg-white p-2 shadow-lg lg:px-9 lg:py-4">
        <h2 className="text-md mb-5 font-semibold md:text-2xl">Product</h2>
        <div className="flex max-w-max flex-wrap items-center justify-center gap-2 lg:gap-6">
          {products &&
            products.slice(0, 8).map((product) => (
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
            ))}
          {loading &&
            Array.from({ length: 8 }, (_, index) => (
              <CardProduct key={index}>
                <CardProduct.Header />
                <CardProduct.Body></CardProduct.Body>
                <CardProduct.Footer />
              </CardProduct>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
