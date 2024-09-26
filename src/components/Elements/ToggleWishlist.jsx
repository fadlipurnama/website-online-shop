import { GoHeart, GoHeartFill } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlistActionCreator } from "../../redux/detailProduct/action";
import { useEffect } from "react";
import {
  asyncSetWishlist,
  clearWishlistActionCreator,
} from "../../redux/wishlist/action";
import { useNavigate } from "react-router-dom";

const ToggleWishlist = ({ productId }) => {
  const dispatch = useDispatch();
  const { wishlist = [], loading } = useSelector((state) => state.wishlist);
  const navigate = useNavigate();
  const { authUser } = useSelector((state) => state.auth);
  const isInWishlist = wishlist?.some((item) => item.product._id === productId);

  const handleToggle = () => {
    if (authUser) {
      dispatch(toggleWishlistActionCreator({ productId, isInWishlist }));
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (authUser) {
      dispatch(asyncSetWishlist());
    }
    return () => {
      dispatch(clearWishlistActionCreator());
    };
  }, [dispatch, authUser]);

  return (
    <span
      onClick={handleToggle}
      className="absolute right-2 top-2 h-8 w-8 cursor-pointer"
    >
      {isInWishlist ? (
        <GoHeartFill className="h-full w-full text-red-500" />
      ) : (
        <GoHeart className="h-full w-full" />
      )}
    </span>
  );
};

export default ToggleWishlist;
