import { useCallback } from "react";

const useSubTotal = () => {
  const calculateDiscountedPrice = useCallback((price, discount) => {
    return price - (price * discount) / 100;
  }, []);

  const calculateSubTotal = useCallback((price, discount, quantity) => {
    const discountedPrice = calculateDiscountedPrice(price, discount);
    return discountedPrice * quantity;
  }, [calculateDiscountedPrice]);

  return { calculateSubTotal };
};

export default useSubTotal;
