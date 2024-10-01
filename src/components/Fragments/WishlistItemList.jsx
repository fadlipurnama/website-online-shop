import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncSetWishlist } from "../../redux/wishlist/action";
import LazyImage from "../Elements/LazyImage";
import { useNavigate } from "react-router-dom";
import ProductPrice from "../Elements/ProductPrice";
import DataNotFound from "./DataNotFound";

const WishlistItemList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlist = [] } = useSelector((states) => states.wishlist);

  useEffect(() => {
    dispatch(asyncSetWishlist());
  }, [dispatch]);
  return (
    <div className="grid grid-cols-1 gap-4 bg-white lg:grid-cols-2">
      <h2 className="text-sm font-bold lag:col-span-2 md:text-base lg:text-xl">
        Wishlist
      </h2>
      {wishlist.length > 0 ? (
        wishlist.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 rounded border bg-white p-2 shadow md:p-4 lg:flex-row lg:gap-4"
          >
            <div className="flex flex-1 gap-2">
              <div className="relative h-16 w-16 sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-40 lg:w-40">
                <LazyImage
                  src={item.product.imageUrl}
                  className="w-full flex-1 cursor-pointer object-cover"
                  onClick={() =>
                    navigate(`/products/all-products/${item.product._id}`)
                  }
                />
                {item.product.discount !== 0 && (
                  <span
                    className={`absolute left-0 ${!item.product.discount && "hidden"} top-0 bg-red-400 p-0.5 text-[8px] text-white sm:text-base`}
                  >
                    {item.product.discount}%
                  </span>
                )}
              </div>
              <div className="flex-1 text-sm sm:text-lg  md:text-xl">
                <h3
                  onClick={() =>
                    navigate(`/products/all-products/${item.product._id}`)
                  }
                  className="cursor-pointer font-semibold"
                >
                  {item.product.name}
                </h3>
                <p>{item.product.brand}</p>
                <p>Stok: {item.product.stock}</p>
                <ProductPrice
                  hiddenTextDiscount={true}
                  price={item.product.price}
                  discount={item.product.discount}
                  sizePrice="text-base md:text-lg lg:text-xl"
                  sizePriceDiscount="text-xs md:text-sm lg:text-base"
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <DataNotFound className={'lg:col-span-2'} description={"Kamu belum memiliki daftar wishlist!"}/>
      )}
    </div>
  );
};

export default WishlistItemList;
