import CardProduct from "../Elements/CardProduct";

const ProductList = ({ products, parentRoutes, route, loading }) => {
  return (
    <div
      className={`mx-auto grid items-center ${products?.length === 0 ? "grid-cols-1 justify-center" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"} justify-center gap-2 lg:gap-6`}
    >
      {products
        ? products
            .filter((item) => item.isActive === true)
            ?.slice(0, 8)
            .map((product, index) => (
              <CardProduct
                route={route}
                parentRoutes={parentRoutes}
                key={product._id || index}
                name={product.name}
                id={product._id}
              >
                <CardProduct.Header
                  discount={product.discount}
                  best={product?.best}
                  category={product?.category}
                  image={product.imageUrl}
                  title={product.name}
                />
                <CardProduct.Body>{product.description}</CardProduct.Body>
                <CardProduct.Footer
                  discount={product.discount}
                  price={product.price}
                />
              </CardProduct>
            ))
        : loading &&
          Array.from({ length: 8 }, (_, index) => (
            <CardProduct key={index}>
              <CardProduct.Header />
              <CardProduct.Body></CardProduct.Body>
              <CardProduct.Footer />
            </CardProduct>
          ))}

      {products?.length === 0 && (
        <div className="mx-auto flex h-[50vh] w-full items-center justify-center lg:h-[70vh]">
          Data tidak ditemukan
        </div>
      )}
    </div>
  );
};

export default ProductList;
