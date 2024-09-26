import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncGetTransactionById,
  resetTransactionData,
} from "../redux/transaction/action"; // Import action untuk fetch
// import DefaultLayout from "../components/Layouts/DefaultLayout";
import DetailTransactionLayout from "../components/Layouts/DetailTransactionLayout";
import Button from "../components/Elements/Button";
import SnapShowTransaction from "../components/Fragments/SnapShowTransaction";
import LoadingPage from "./loading";

const DetailTransactionPage = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const orderId = queryParams.get("order_id");
  const transactionId = queryParams.get("transactionId");
  // const transactionStatus = queryParams.get("transaction_status");
  const snapToken = queryParams.get("snap_token");

  const dispatch = useDispatch();
  const { transactionData, loading, error, snapShowTrigger } = useSelector(
    (state) => state.transaction,
  ); // Ambil data dari Redux

  // const [snapShowOpen, setSnapShowOpen] = useState(false);

  useEffect(() => {
    if (transactionId) {
      dispatch(asyncGetTransactionById(transactionId)); // Fetch data transaksi
    }

    return () => {
      dispatch(resetTransactionData()); // Reset data saat komponen unmount
    };
  }, [transactionId, dispatch]);

  // const handleSnapOpen = () => {
  //   if (snapToken) {
  //     setSnapShowTrigger(true);
  //   } else {
  //     console.error("Snap token not found");
  //   }
  // };

  return (
    <DetailTransactionLayout
      pathLocation={`${location.pathname}${location.search}`}
      orderId={orderId}
    >
      <div className="w-full rounded-lg bg-white pb-6">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Detail Transaksi
        </h2>
        {loading && <LoadingPage />} 
        {error && <p>Error: {error.message}</p>} {/* Tampilkan error */}
        {transactionData && (
          <div className="flex min-w-full flex-col-reverse justify-between gap-6 lg:flex-row lg:gap-0">
            <div className="flex w-full flex-col justify-between lg:w-[45%]">
              <div>
                <h3 className="font-bold text-gray-700">Order ID:</h3>
                <p className="text-gray-600">{transactionData.orderId}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-700">Transaction ID:</h3>
                <p className="text-gray-600">{transactionId}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-700">Status:</h3>
                <span
                  className={`rounded-md px-2 py-1 text-white ${
                    transactionData.status === "PENDING_PAYMENT"
                      ? "bg-yellow-500"
                      : transactionData.status === "SUCCESS"
                        ? "bg-green-500"
                        : "bg-red-500"
                  }`}
                >
                   {
                    transactionData.status === "PENDING_PAYMENT"
                      ? "PESANAN BELUM DIBAYARr"
                      : transactionData.status === "SUCCESS"
                        ? "PESANAN SUDAH DIBAYAR"
                        : "PEMBAYARAN DIBATALKAN"
                  }
                </span>
              </div>
              <div className="mt-6 rounded-md bg-gray-50 p-4">
                <h3 className="mb-4 text-lg font-semibold text-gray-800">
                  Total Pembayaran
                </h3>
                <div className="text-right text-xl font-bold text-gray-900">
                  Rp{transactionData.grossAmount?.toLocaleString()}
                </div>
              </div>
              {transactionData.status !== "SUCCESS" && (
                <Button
                  // onClick={handleSnapOpen}
                  className="rounded-lg py-4 text-[16px] font-semibold"
                >
                  Selesaikan Pembayaran
                </Button>
              )}
            </div>

            <div className="wfull lg:w-[45%]">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">
                Produk yang Dibeli
              </h3>
              <div className="space-y-4">
                {transactionData.products?.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between rounded-md bg-gray-100 p-4"
                  >
                    <div>
                      <h4 className="font-medium text-gray-700">
                        {product.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {product.quantity} x Rp{product.price?.toLocaleString()}
                      </p>
                    </div>
                    <div className="font-bold text-gray-800">
                      Rp{(product.price * product.quantity)?.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <SnapShowTransaction
        snapShowTrigger={snapShowTrigger}
        // setSnapShowOpen={setSnapShowOpen}
        transactionData={{
          token: snapToken,
          id: transactionId,
        }}
      />
    </DetailTransactionLayout>
  );
};

export default DetailTransactionPage;
