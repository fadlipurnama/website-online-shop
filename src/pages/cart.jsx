import { useSelector } from "react-redux";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import CartItemList from "../components/Fragments/CartItemList";
import SummaryCartList from "../components/Fragments/SummaryCartList";

const CartPage = () => {
  const { carts, loading } = useSelector((states) => states.carts);

  return (
    <DefaultLayout
      title="Tersedia Berbagai Barang Elektrik | Keranjang Belanja"
      label="Keranjang Belanja"
    >
      <div className="flex flex-col justify-between gap-4 p-1 lg:min-h-screen lg:flex-row lg:p-4">
        <CartItemList carts={carts} loading={loading} />
        {carts && <SummaryCartList carts={carts} loading={loading} />}
      </div>
    </DefaultLayout>
  );
};

export default CartPage;
