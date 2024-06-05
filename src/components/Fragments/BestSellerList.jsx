import CardProduct from "../Elements/CardProduct";

const BestSellerList = ({ products, route, loading }) => {
  return (
    <div className="flex gap-3 overflow-x-auto pb-5 lg:gap-6">
      {products
        ? products
            ?.filter((item) => item.isActive && item.best === true)
            .slice(0, 8)
            .map((product) => (
              <CardProduct
                key={product._id}
                route={route}
                id={product._id}
                minWidth="min-w-40 md:min-w-60 xl:min-w-72 md:max-w-40 lg:max-w-80"
              >
                <CardProduct.Header
                  best={product.best}
                  category={product?.category}
                  image={product.imageUrl}
                  title={product.name}
                />
                <CardProduct.Footer
                  discount={product.discount}
                  price={product.price}
                />
              </CardProduct>
            ))
        : loading &&
          Array.from({ length: 8 }, (_, index) => (
            <CardProduct
              key={index}
              minWidth="min-w-60 sm:max-w-30 md:max-w-40 xl:min-w-72 lg:max-w-80"
            >
              <CardProduct.Header />
              <CardProduct.Footer />
            </CardProduct>
          ))}
    </div>
  );
};

export default BestSellerList;
