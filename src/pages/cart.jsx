import { useSelector } from "react-redux";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import CartItemList from "../components/Fragments/CartItemList";

const CartPage = () => {
  // const dispatch = useDispatch();
  const { carts, loading } = useSelector((states) => states.carts);

  return (
    <DefaultLayout label="List Keranjang Belanja">
      <div className="flex min-h-screen flex-col justify-between gap-4  p-1 lg:flex-row lg:p-4">
        <CartItemList carts={carts} loading={loading} />
        <div className="w-full lg:max-w-sm px-2">
          <div className="border p-2 rounded shadow bgwhite">
            <h2 className="text-base font-bold sm:text-lg md:text-xl lg:text-2xl">Ringkasan Belanja</h2>
            <h3>Total</h3>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CartPage;
