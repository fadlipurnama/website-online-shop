import CartItem from "../Elements/CartItem";
import useSubTotal from "../../hooks/useCalculateSubTotal";

const CartItemList = ({ carts }) => {
  const { calculateSubTotal } = useSubTotal();

  return (
    <div className="custom-scrollbar flex max-h-screen w-full flex-1 flex-col gap-4 overflow-y-auto bg-white p-4">
      <h2 className="text-base font-bold sm:text-lg md:text-xl lg:text-2xl">
        Keranjang Belanja
      </h2>
      <div
        className={`${(!carts || carts?.length === 0) && "m-auto"} flex w-full flex-col gap-2`}
      >
        {carts &&
          carts?.map((item) => (
            <CartItem key={item._id}>
              <CartItem.Header
                productId={item.product._id}
                productImage={item.product.imageUrl}
                productBrand={item.product.brand}
                productDiscount={item.product.discount}
                productStock={item.product.stock}
                productName={item.product.name}
              />
              <CartItem.Body
                cartItemQty={item.quantity}
                cartItemId={item._id}
                productPrice={item.product.price}
                productId={item.product.Id}
                productDiscount={item.product.discount}
                productStock={item.product.stock}
              />
              <CartItem.Footer
                calculateSubTotal={calculateSubTotal}
                productDiscount={item.product.discount}
                productPrice={item.product.price}
                cartItemQty={item.quantity}
                cartItemId={item._id}
              />
            </CartItem>
          ))}
      </div>
    </div>
  );
};

export default CartItemList;
