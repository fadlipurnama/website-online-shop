import { IoBagHandleOutline } from "react-icons/io5";

const CartIcon = ({ itemCount, onClick = () => {} }) => {
  return (
    <div
      onClick={onClick}
      className="relative h-6 md:w-6 cursor-pointer lg:block lg:min-h-8 lg:min-w-8"
    >
      <div className="absolute -right-1/3 -top-1/3 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-sm text-white lg:h-6 lg:w-6">
        <span>{itemCount}</span>
      </div>
      <IoBagHandleOutline className="h-full w-full" />
    </div>
  );
};

export default CartIcon;
