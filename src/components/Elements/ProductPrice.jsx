const ProductPrice = ({
  price,
  discount,
  loading,
  sizePriceDiscount = "",
  sizePrice = "",
  hiddenTextDiscount = false,
}) => {
  const promoPrice = discount && price - (price * discount) / 100;
  return (
    <div className="flex flex-wrap gap-2">
      <span
        className={` ${!price || loading ? "animate-pulse bg-gray-200 text-gray-200" : "text-primaryColor"} ${sizePrice} font-medium ${discount ? "block" : "hidden"}`}
      >
        {promoPrice
          ?.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })
          .replace(/,00$/, "")}
      </span>
      <span
        className={`${!price || loading ? "animate-pulse bg-gray-200 text-gray-200" : discount ? `${sizePriceDiscount} text-gray-500 line-through ${hiddenTextDiscount ? "hidden" : "block"}` : `font-medium text-primaryColor ${sizePrice}`} font-medium `}
      >
        {price
          ?.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })
          .replace(/,00$/, "")}
      </span>

      {discount !== 0 && (
        <span
          className={`${hiddenTextDiscount ? "hidden" : "block"} font-semibold ${!discount || loading ? "animate-pulse bg-gray-200 text-gray-200" : "text-red-500"} ${sizePriceDiscount}`}
        >
          {`${discount}%`}
        </span>
      )}
    </div>
  );
};

export default ProductPrice;
