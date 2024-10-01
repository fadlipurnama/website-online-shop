import { useCallback } from "react";

const useSubTotal = () => {
  function customRound(number) {
    const integerPart = Math.floor(number);
    const decimalPart = number - integerPart;
    return decimalPart > 0.5 ? integerPart + 1 : integerPart;
  }

  const calculateDiscountedPrice = useCallback((price, discount) => {
    return customRound(price - (price * discount) / 100);
  }, []);

  const calculateSubTotal = useCallback(
    (price, discount, quantity) => {
      const discountedPrice = calculateDiscountedPrice(price, discount);
      return discountedPrice * quantity;
    },
    [calculateDiscountedPrice],
  );

  return { calculateSubTotal };
};

export default useSubTotal;
