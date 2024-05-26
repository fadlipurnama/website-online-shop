import CardProduct from "../Elements/CardProduct";

const BestSellerList = ({ products, loading }) => {
  return (
    <div className="flex overflow-x-auto pb-5 lg:gap-6">
      {products
        ? products
            ?.filter((item) => item.best === true)
            .slice(0, 8)
            .map((product) => (
              <CardProduct key={product._id} minWidth="min-w-60 xl:min-w-72">
                <CardProduct.Header
                  best={product.best}
                  category={product?.category}
                  image={product.imageUrl}
                  title={product.name}
                />
                <CardProduct.Footer discount={product.discount} price={product.price} />
              </CardProduct>
            ))
        : loading &&
          Array.from({ length: 8 }, (_, index) => (
            <CardProduct key={index} minWidth="min-w-60 xl:min-w-72">
              <CardProduct.Header />
              <CardProduct.Footer />
            </CardProduct>
          ))}
    </div>
  );
};

export default BestSellerList;
