import { useEffect } from "react";
import { IoBagHandleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  asyncSetCarts,
  clearDataCartsActionCreator,
} from "../../../redux/carts/action";

const CartIcon = ({ authUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { totalQuantity } = useSelector((state) => state.carts);

  useEffect(() => {
    if (authUser) {
      dispatch(asyncSetCarts());
    } else {
      dispatch(clearDataCartsActionCreator());
    }
  }, [dispatch, authUser]);

  return (
    <div
      onClick={() => navigate("/cart/cart-list")}
      className="relative h-6 cursor-pointer md:w-6 lg:block lg:min-h-8 lg:min-w-8"
    >
      {totalQuantity && totalQuantity !== 0 ? (
        <span
          className={`absolute lg:text-sm ${totalQuantity > 99 ? "-right-1/2 -top-1/2 lg:h-7 lg:w-7" : "-right-1/3 -top-1/3 lg:h-6 lg:w-6 "} flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[9px] font-semibold text-white `}
        >
          {totalQuantity > 99 ? "99+" : totalQuantity}
        </span>
      ): ''}
      <IoBagHandleOutline className="h-full w-full" />
    </div>
  );
};

export default CartIcon;
