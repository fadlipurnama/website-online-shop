import { useSelector } from "react-redux";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import CartItemList from "../components/Fragments/CartItemList";
import SummaryCartList from "../components/Fragments/SummaryCartList";
import DataNotFound from "../components/Fragments/DataNotFound";
import LoadingPage from "./loading";

const CartPage = () => {
  const { carts, loading } = useSelector((states) => states.carts);

  


  return (
    <DefaultLayout
      title="Tersedia Berbagai Barang Elektrik | Keranjang Belanja"
      label="Keranjang Belanja"
    >
      <div className="flex flex-col min-h-[65vh] justify-between gap-4 p-1 lg:p-4 xl:flex-row">
        {loading ? (
          <LoadingPage />
        ) : carts ? (
          carts.length !== 0 ? (
            <>
              <CartItemList carts={carts} />
              <SummaryCartList carts={carts} />
            </>
          ) : (
            <DataNotFound
              title={"Waduh, Daftar kerajang kamu kosong nih!"}
              description={"Silahkan isi keranjang belanja kamu."}
            />
          )
        ) : (
          <DataNotFound
            title={"Waduh, Daftar kerajang kamu kosong nih!"}
            description={"Silahkan isi keranjang belanja kamu."}
          />
        )}
     
      </div>
    </DefaultLayout>
  );
};

export default CartPage;
