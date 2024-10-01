import { useLocation, useNavigate } from "react-router-dom";
import useTransactionDetail from "../hooks/useTransactionDetail";
import DetailTransactionLayout from "../components/Layouts/DetailTransactionLayout";
import Button from "../components/Elements/Button";
import LoadingPage from "./loading";
import TotalItemTransaction from "../components/Elements/TotalItemTransaction";
import useSnap from "../hooks/useSnap";
import { formatCurrency } from "../utils/formatCurrency";
import DataNotFound from "../components/Fragments/DataNotFound";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { asyncDeleteTransaction } from "../redux/transaction/action";
import Swal from "sweetalert2";

const DetailTransactionPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const transactionId = queryParams.get("transaction_id");
  const [cancelTransaction, setCancelTransaction] = useState(false);
  const navigate = useNavigate();
  const { snapPay } = useSnap();
  const { transactionData, loading, filteredOrderData } =
    useTransactionDetail(transactionId);

  const dispatch = useDispatch();

  const filteredCost =
    transactionData?.products?.filter(
      (product) =>
        product.name === "PPN" || product.name === "Biaya Pengiriman",
    ) || [];

  const handlePayment = () => {
    if (transactionData) {
      snapPay(transactionData.token, {
        onSuccess: () => {
          // navigate(`/transaction?transaction_id=${transactionData.id}`),
          Swal.fire({
            icon: "success",
            title: "Transaksi Berhasil",
            text: "Pembayaran berhasil dilakukan.",
          });
        },
        onPending: () =>
          navigate(`/transaction?transaction_id=${transactionData.id}`),
        onError: (error) => {
          console.error("Payment error:", error);
          alert("Payment failed!");
        },
        onClose: () => console.log("Payment dialog closed."),
      });
    }
  };

  return (
    <DetailTransactionLayout
      pathLocation={`${location.pathname}${location.search}`}
      transactionId={transactionId}
    >
      <div className="my-4 w-full rounded-lg bg-white px-6 pb-6">
        {loading ? (
          <LoadingPage />
        ) : transactionData ? (
          <>
            <div className="mb-4 flex w-full flex-col-reverse items-start justify-between sm:flex-row">
              <div className="grid flex-1 gap-2 lg:grid-cols-2">
                <div className="text-base lg:text-lg">
                  <h3 className="font-bold text-gray-700">Transaction ID</h3>
                  <p className="text-gray-600">
                    {transactionId?.toUpperCase()}
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-700">Kurir</h3>
                  <p className="text-gray-600">
                    {transactionData.shippingCourier?.toUpperCase()} -{" "}
                    {transactionData.shippingService?.toUpperCase()}
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-700">Metode Pembayaran</h3>
                  <p className="text-gray-600">
                    {transactionData.paymentMethod !== ""
                      ? transactionData.paymentMethod?.toUpperCase()
                      : "-"}
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-700">
                    Tanggal Pembayaran
                  </h3>
                  <p className="text-gray-600">
                    {transactionData.settlementTime !== ""
                      ? transactionData.settlementTime
                      : "-"}
                  </p>
                </div>
                <div>
                  <h3 className="col-span-2 font-bold text-gray-700">
                    Alamat Pengiriman
                  </h3>
                  <p className="text-gray-600">
                    {transactionData.shippingAddress}
                  </p>
                </div>
                {transactionData.status === "PAID" && (
                  <div
                    onClick={() =>
                      navigate(
                        `/order/${filteredOrderData[0]?.shippingNumber !== "" ? filteredOrderData[0]?.shippingNumber : "-"}?order_id=${filteredOrderData[0].transactionId}&user_id=${filteredOrderData[0].userId}`,
                      )
                    }
                    className="cursor-pointer text-base font-bold text-primaryColor lg:text-lg"
                  >
                    Lihat Detail Pesanan
                  </div>
                )}
                {!cancelTransaction ? (
                  transactionData &&
                  transactionData.status !== "PAID" &&
                  transactionData.status !== "CANCELED" && (
                    <div
                      onClick={() => setCancelTransaction(true)}
                      className="cursor-pointer text-base text-red-600 lg:text-lg"
                    >
                      Batalkan Transaksi
                    </div>
                  )
                ) : (
                  <div className="flex h-8 w-52 gap-3">
                    <Button
                      variant="btn-cancel"
                      onClick={() => {
                        dispatch(asyncDeleteTransaction(transactionId));
                        Swal.fire({
                          icon: "success",
                          title: "Transaksi Dibatalkan!",
                          text: "Pembayaran berhasil batalkan.",
                          showCancelButton: true,
                          confirmButtonText: "Ok",
                          cancelButtonText: "Kembali",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            navigate(`/user-profile/daftar-transaksi`); // Navigasi ke detail transaksi
                          } else {
                            navigate('/'); // Kembali ke beranda
                          }
                        });
                      }}
                      className="cursor-pointer px-2 text-base"
                    >
                      Konfirmasi
                    </Button>
                    <Button
                      onClick={() => setCancelTransaction(!cancelTransaction)}
                      className="cursor-pointer text-base"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
              <div
                className={`rounded-md px-2 py-1 text-base text-white lg:text-lg ${
                  transactionData.status === "PENDING_PAYMENT"
                    ? "bg-yellow-500"
                    : transactionData.status === "PAID"
                      ? "bg-green-500"
                      : "bg-red-500"
                }`}
              >
                {transactionData.status === "PENDING_PAYMENT"
                  ? "PESANAN BELUM DIBAYAR"
                  : transactionData.status === "PAID"
                    ? "PEMBAYARAN BERHASIL"
                    : "PEMBAYARAN DIBATALKAN"}
              </div>
            </div>
            <div className="mb-4 flex w-full min-w-full flex-col gap-4 rounded-lg bg-gray-100 p-4 lg:gap-10">
              <TotalItemTransaction transactionData={transactionData} />

              {filteredCost?.map((cost) => (
                <div
                  className="flex justify-between rounded-md text-slate-500"
                  key={cost.id}
                >
                  <h3 className="text-base lg:text-lg">{cost.name}</h3>
                  <p className="text-base lg:text-lg">
                    {formatCurrency(cost.price)}
                  </p>
                </div>
              ))}

              <div className="flex items-center justify-between rounded-md ">
                <h3 className="text-lg font-semibold text-gray-800">
                  Total Pembayaran
                </h3>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(transactionData.grossAmount)}
                </p>
              </div>
            </div>
          </>
        ) : (
          <DataNotFound
            title={"Data tidak ditemukan"}
            description={"Informasi transaksi yang kamu cari tidak ada."}
          />
        )}

        {transactionData &&
          transactionData.status !== "PAID" &&
          transactionData.status !== "CANCELED" && (
            <Button
              onClick={handlePayment}
              className="rounded-lg py-4 text-lg font-semibold"
            >
              Selesaikan Pembayaran
            </Button>
          )}
      </div>
    </DetailTransactionLayout>
  );
};

export default DetailTransactionPage;
