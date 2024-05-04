import { AiOutlineShoppingCart } from "react-icons/ai";

const CartIcon = ({ itemCount, onClick = () => {} }) => {
  return (
    <div
      onClick={onClick}
      className="relative h-6 w-6 cursor-pointer lg:block lg:h-8 lg:w-8"
    >
      <div className="absolute -right-1/3 -top-1/3 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-sm text-white lg:h-6 lg:w-6">
        <span>{itemCount}</span>
      </div>
      <AiOutlineShoppingCart className="h-full w-full" />
    </div>
  );
};

export default CartIcon;
