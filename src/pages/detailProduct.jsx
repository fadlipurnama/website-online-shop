import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  asyncSetDetailProduct,
  clearDetailProductActionCreator,
} from "../redux/detailProduct/action";
import { useParams } from "react-router-dom";
import LazyImage from "../components/Elements/LazyImage";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import Price from "../components/Elements/Price";
import ProductQuantity from "../components/Elements/ProductQuantity";

const DetailProductPage = () => {
  const { productId } = useParams();
  const { detailProduct, loading } = useSelector(
    (states) => states.detailProduct
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncSetDetailProduct(productId));
    
    // Cleanup function to clear detail product when component unmounts
    return () => {
      dispatch(clearDetailProductActionCreator());
    };
  }, [dispatch, productId]);

  return (
    <DefaultLayout lastLabel={detailProduct?.name}>
      <div className="flex w-full flex-col gap-2 bg-white py-8 text-gray-800 lg:flex-row lg:gap-8">
        <LazyImage
          loading={loading}
          discount={detailProduct?.discount}
          src={detailProduct?.imageUrl}
          className={`w-full rounded border object-cover px-2 lg:w-[528px]`}
        />
        <div className="mt-10 flex flex-1 flex-col gap-4 text-gray-800 lg:mt-0">
          <div className="flex flex-col gap-2">
            <h2 className="items-center text-base font-semibold text-gray-800 sm:text-xl lg:flex lg:text-2xl">
              {detailProduct?.name}
              {detailProduct?.best && (
                <span
                  className={`ml-4 rounded-full bg-primaryColor px-2 py-1 text-xs font-semibold text-white`}
                >
                  Best Seller
                </span>
              )}
            </h2>
            <p className="text-sm sm:text-base">
              {detailProduct?.serialNumber}
            </p>
          </div>

          <Price
            price={detailProduct?.price}
            discount={detailProduct?.discount}
            sizePrice="text-base lg:text-2xl"
            sizePriceDiscount="text-sm lg:text-lg"
            loading={loading}
          />

          <div className="mt-10 w-full text-gray-800">
            <table className="w-full table-auto">
              <tbody>
                <tr>
                  <td className="pr-4 font-semibold">Merek Produk</td>
                  <td>{detailProduct?.brand}</td>
                </tr>
                <tr>
                  <td className="pr-4 font-semibold">Category</td>
                  <td>{detailProduct?.category.toUpperCase()}</td>
                </tr>
                <tr>
                  <td className="pr-4 font-semibold">Ukuran Volt</td>
                  <td>{detailProduct?.ratedVoltage}</td>
                </tr>

                <tr>
                  <td className="pr-4 font-semibold">Berat Produk</td>
                  <td>{detailProduct?.netWeight}</td>
                </tr>
                <tr>
                  <td className="pr-4 font-semibold">Stock</td>
                  <td>{detailProduct?.stock}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <ProductQuantity
            className="w-20 px-4 py-2"
            inputBox="p-2 sm:max-w-20"
            container="flex-wrap gap-2"
            productId={productId}
            stock={detailProduct?.stock}
          />

          <div className="mt-5">
            <h3 className="mb-2 text-lg font-semibold">Deskripsi</h3>
            <p>{detailProduct?.description}</p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default DetailProductPage;
