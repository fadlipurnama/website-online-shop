import { useDispatch } from "react-redux";
import LazyImage from "./LazyImage";
import Price from "./Price";
import ProductQuantity from "./ProductQuantity";
import { FaTrashAlt } from "react-icons/fa";
import { asyncDeleteCartItem } from "../../redux/carts/action";
import Button from "./Button";
import { Link } from "react-router-dom";

const CartItem = ({ children }) => {
  return (
    <div className="flex flex-col bg-white shadow rounded gap-2 border p-2 md:p-4 lg:flex-row lg:gap-4">
      {children}
    </div>
  );
};

const Header = ({
  productId,
  productImage,
  productDiscount,
  productStock,
  productBrand,
  productName,
}) => {
  return (
    <div className="flex gap-2 flex-1">
      <div className="relative h-16 w-16 sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-40 lg:w-40">
        <LazyImage src={productImage} className="w-full flex-1 object-cover" />
        {productDiscount !== 0 && (
          <span
            className={`absolute left-0 ${!productDiscount && "hidden"} top-0 bg-red-400 p-0.5 text-[8px] text-white sm:text-base`}
          >
            {productDiscount}%
          </span>
        )}
      </div>

      <div className="flex-1 text-sm sm:text-lg  md:text-xl">
        <Link to={`/products/all-products/${productId}`} className="font-semibold">{productName}</Link>
        <p>{productBrand}</p>
        <p>Stok: {productStock}</p>
      </div>
    </div>
  );
};

const Body = ({
  productPrice,
  productStock,
  productDiscount,
  productId,
  cartItemId,
  cartItemQty,
}) => {
  return (
    <div className="flex justify-between lg:items-center gap-2 lg:flex-col">
      <Price
        hiddenTextDiscount={true}
        price={productPrice}
        discount={productDiscount}
        sizePrice="text-base md:text-lg lg:text-xl"
        sizePriceDiscount="text-xs md:text-sm lg:text-base"
      />
      <ProductQuantity
        container="text-xs max-w-32 md:max-w-36 lg:max-w-40 md:text-sm lg:text-base"
        className="px-3 py-0.5 lg:px-4 lg:py-2"
        inputBox="p-1 lg:p-2"
        btnAddToCart={false}
        cartItemId={cartItemId}
        productId={productId}
        currentQty={cartItemQty}
        stock={productStock}
      />
    </div>
  );
};
const Footer = ({
  calculateSubTotal,
  productPrice,
  cartItemQty,
  productDiscount,
  cartItemId,
}) => {
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between lg:gap-2 lg:flex-col">
      <div className={`flex flex-col text-xs md:text-sm lg:text-base`}>
        <h3 className="font-bold">Sub Total</h3>
        {calculateSubTotal(productPrice, productDiscount, cartItemQty)
          .toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })
          .replace(/,00$/, "")}
      </div>
      <Button
        variant="btn-2"
        className="flex max-w-max items-center lg:py-2 gap-2 px-1 text-xs md:px-2 md:text-sm lg:text-base"
        onClick={() => dispatch(asyncDeleteCartItem(cartItemId))}
      >
        <FaTrashAlt className="" />
        HAPUS
      </Button>
    </div>
  );
};

CartItem.Header = Header;
CartItem.Body = Body;
CartItem.Footer = Footer;

export default CartItem;
