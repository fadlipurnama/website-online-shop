import LazyImage from "../Elements/LazyImage"
import ProductQuantity from "../Elements/ProductQuantity"
import ProductPrice from "../Elements/ProductPrice"
import ToggleWishlist from "../Elements/ToggleWishlist"

const DetailProduct = ({data, loading, productId}) => {
  return (
    <div className="flex w-full flex-col gap-2 bg-white py-8 text-gray-800 lg:flex-row lg:gap-8">
    <div className="rounded border relative px-2 lg:w-[528px]">
      <LazyImage
        loading={loading}
        discount={data?.discount}
        src={data?.imageUrl}
        className={`h-full w-full object-cover`}
      />
     <ToggleWishlist productId={data?._id}/>
    </div>
    <div className="mt-10 flex flex-1 flex-col gap-4 text-gray-800 lg:mt-0">
      <div className="flex flex-col gap-2">
        <h2 className="items-center text-base font-semibold text-gray-800 sm:text-xl lg:flex lg:text-2xl">
          {data?.name}
          {data?.best && (
            <span
              className={`ml-4 rounded-full bg-primaryColor px-2 py-1 text-xs font-semibold text-white`}
            >
              Best Seller
            </span>
          )}
        </h2>
        <p className="text-sm sm:text-base">
          {data?.serialNumber}
        </p>
      </div>

      <ProductPrice
        price={data?.price}
        discount={data?.discount}
        sizePrice="text-base lg:text-2xl"
        sizePriceDiscount="text-sm lg:text-lg"
        loading={loading}
      />

      <div className="mt-10 w-full text-gray-800">
        <table className="w-full table-auto">
          <tbody>
            <tr>
              <td className="pr-4 font-semibold">Merek Produk</td>
              <td>{data?.brand}</td>
            </tr>
            <tr>
              <td className="pr-4 font-semibold">Category</td>
              <td>{data?.category.toUpperCase()}</td>
            </tr>
            <tr>
              <td className="pr-4 font-semibold">Ukuran Volt</td>
              <td>{data?.ratedVoltage}</td>
            </tr>

            <tr>
              <td className="pr-4 font-semibold">Berat Produk</td>
              <td>{data?.netWeight}</td>
            </tr>
            <tr>
              <td className="pr-4 font-semibold">Stock</td>
              <td>{data?.stock}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <ProductQuantity
        className="w-20 px-4 py-2"
        inputBox="p-2 sm:max-w-20"
        container="flex-wrap gap-2"
        productId={productId}
        stock={data?.stock}
      />

      <div className="mt-5">
        <h3 className="mb-2 text-lg font-semibold">Deskripsi</h3>
        <p>{data?.description}</p>
      </div>
    </div>
  </div>
  )
}

export default DetailProduct
