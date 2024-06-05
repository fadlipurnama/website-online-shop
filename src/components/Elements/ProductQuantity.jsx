import { useState } from "react";
import Button from "./Button";
import InputForm from "./Input";
import {
  asyncAddItemToCart,
  asyncDeleteCartItem,
  asyncUpdateQuantityCartItem,
} from "../../redux/carts/action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductQuantity = ({
  stock,
  container,
  currentQty,
  productId,
  cartItemId,
  btnAddToCart = true,
  className,
  inputBox,
}) => {
  const { authUser } = useSelector((states) => states.auth);
  const [quantity, setQuantity] = useState(currentQty || 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const incrementQuantity = () => {
    const newQuantity = quantity < stock ? quantity + 1 : stock;
    setQuantity(newQuantity);
    if (authUser && !btnAddToCart && cartItemId) {
      dispatch(
        asyncUpdateQuantityCartItem({ cartItemId, quantity: newQuantity }),
      );
    }
  };

  const decrementQuantity = () => {
    const newQuantity = quantity > 0 ? quantity - 1 : 0;
    setQuantity(newQuantity);
    if (authUser && !btnAddToCart && cartItemId) {
      if(quantity === 1) {
        dispatch(asyncDeleteCartItem(cartItemId))
      } else {
        dispatch(
          asyncUpdateQuantityCartItem({ cartItemId, quantity: newQuantity }),
        );
      }
     
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (btnAddToCart) {
      if (value > stock) {
        setQuantity(stock);
      } else if (isNaN(value)) {
        setQuantity(0);
      } else {
        setQuantity(value);
      }
    }
  };

  const handleAddItemToCart = () => {
    if (!authUser) {
      navigate("/login");
    } else {
      dispatch(asyncAddItemToCart({ productId, quantity }));
    }
  };

  return (
    <div className={`${container} flex w-full`}>
      <div className="flex space-x-2 w-full">
        <Button
          hovered={false}
          variant="btn-2"
          onClick={decrementQuantity}
          className={`${className} max-w-max rounded font-bold`}
        >
          -
        </Button>
        <InputForm
          type="text"
          value={quantity}
          className={`rounded border-primaryColor ${inputBox} text-center`}
          onChange={handleQuantityChange}
        />

        <Button
          hovered={false}
          variant="btn-2"
          onClick={incrementQuantity}
          className={`${className} max-w-max rounded font-bold`}
        >
          +
        </Button>
      </div>
      {btnAddToCart && (
        <Button
          onClick={handleAddItemToCart}
          className={`rounded sm:max-w-60 ${className}`}
        >
          Add to cart
        </Button>
      )}
    </div>
  );
};

export default ProductQuantity;
