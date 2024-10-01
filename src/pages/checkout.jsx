import { useDispatch, useSelector } from "react-redux";
import ShippingCheckout from "../components/Fragments/ShippingCheckout";
import SummaryCheckout from "../components/Fragments/SummaryCheckout";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import useProvinces from "../hooks/useProvinces";
import useCities from "../hooks/useCities";
import LoadingPage from "./loading";
import { useNavigate } from "react-router-dom";
import useSnap from "../hooks/useSnap";
import DataNotFound from "../components/Fragments/DataNotFound";
import { asyncClearCartUser } from "../redux/carts/action";

const CheckoutPage = () => {
  const { carts, loading } = useSelector((states) => states.carts);
  const { transactionData  } = useSelector(
    (state) => state.transaction,
  );
  const { authUser } = useSelector((states) => states.auth);

  const [selectedShippingOption, setSelectedShippingOption] = useState();
  const [weightOrder, setWeightOrder] = useState(0);
  const [shippingCost, setShippingCost] = useState(0); // Ongkos kirim default
  const navigate = useNavigate();
  const { snapPay } = useSnap();
  const dispatch = useDispatch();
  const [isPopupShown, setIsPopupShown] = useState(false);

  const provinces = useProvinces();
  const cities = useCities(authUser?.province);

  useEffect(() => {
    if (transactionData && transactionData.token && !isPopupShown) {
      setIsPopupShown(true); // Set state agar popup hanya muncul sekali
      snapPay(transactionData.token, {
        onSuccess: function (result) {
          console.log("success", result);
          dispatch(asyncClearCartUser());
          setIsPopupShown(false);
          Swal.fire({
            icon: "success",
            title: "Transaksi Berhasil",
            text: "Pembayaran berhasil dilakukan.",
          })
        },
        onPending: function (result) {
          console.log("pending", result);
          dispatch(asyncClearCartUser());
          setIsPopupShown(false);
          // navigate(`/transaction?transaction_id=${transactionData.id}`);
          Swal.fire({
            icon: "warning",
            title: "Transaksi Pending",
            text: "Pembayaran tertunda.",
            confirmButtonText: "Detail Transaksi",
          }).then(() => {
            navigate(`/transaction?transaction_id=${transactionData.id}`); // Navigasi ke detail transaksi
          });
        },
        onError: (error) => {
          console.error("Payment error:", error);
          dispatch(asyncClearCartUser());
          setIsPopupShown(false);
          Swal.fire({
            icon: "error",
            title: "Transaksi Gagal",
            text: "Pembayaran gagal dilakukan.",
            confirmButtonText: "Kembali",
          });
        },
        onClose: function () {
          console.log("close");
          navigate(`/transaction?transaction_id=${transactionData.id}`);
          dispatch(asyncClearCartUser());
          Swal.fire({
            icon: "warning",
            title: "Transaksi Pending",
            text: "Pembayaran tertunda.",
            confirmButtonText: "Detail Transaksi",
          }).then(() => {
            navigate(`/transaction?transaction_id=${transactionData.id}`); // Navigasi ke detail transaksi
          });
          setIsPopupShown(false);
        },
      });
    }
  }, [transactionData, dispatch, navigate, snapPay, isPopupShown]);

  return (
    <DefaultLayout title="Tersedia Berbagai Barang Elektrik | Checkout">
      <div className="mb-4 flex flex-col-reverse gap-14 lg:flex-row">
        {loading ? (
          <LoadingPage />
        ) : (
          carts &&
          (carts.length !== 0 ? (
            <>
              <SummaryCheckout
                setWeightOrder={setWeightOrder}
                provinces={provinces}
                cities={cities}
                carts={carts}
                setSelectedShippingOption={setSelectedShippingOption}
                selectedShippingOption={selectedShippingOption}
                loading={loading}
                authUser={authUser}
                shippingCost={shippingCost}
                transactionData={transactionData}
              />
              <ShippingCheckout
                setShippingCost={setShippingCost}
                authUser={authUser}
                provinces={provinces}
                cities={cities}
                setSelectedShippingOption={setSelectedShippingOption}
                selectedShippingOption={selectedShippingOption}
                weightOrder={weightOrder}
              />
            </>
          ) : (
            <DataNotFound
              title={"Waduh, Daftar kerajang kamu kosong nih!"}
              description={"Silahkan isi keranjang belanja kamu."}
            />
          ))
        )}
      </div>
    </DefaultLayout>
  );
};

export default CheckoutPage;
