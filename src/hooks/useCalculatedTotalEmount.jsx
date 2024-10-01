import { useMemo } from "react";

const useCalculateTotalAmount = (carts, calculateSubTotal) => {
  
  const totalAmount = useMemo(() => {
    if (!carts || carts.length === 0) {
      return 0;
    }

    const total = carts.reduce((acc, item) => {
      const price = item.product.price || 0;
      const discount = item.product.discount || 0;
      const quantity = item.quantity || 0;

      const subTotal = calculateSubTotal(price, discount, quantity);
      acc += subTotal;

      return acc;
    }, 0);

    return total;
  }, [carts, calculateSubTotal]);

  return totalAmount;
};

export default useCalculateTotalAmount;
