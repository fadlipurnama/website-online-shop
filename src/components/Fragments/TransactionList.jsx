import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { asyncGetTransactionsByUserId, resetTransactionData } from "../../redux/transaction/action";
import LoadingPage from "../../pages/loading";

const TransactionList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { transactionData, loading } = useSelector((state) => state.transaction);
  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      // Mengambil transaksi berdasarkan ID pengguna hanya jika transactionData kosong
        dispatch(asyncGetTransactionsByUserId(userId));
    }
    return () => {
      dispatch(resetTransactionData()); // Reset data saat komponen unmount
    };
  }, [dispatch, userId]);

  // Menampilkan loading state
  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="space-y-4">
      <div className="flex overflow-y-auto max-h-screen custom-scrollbar flex-col space-y-4 rounded-lg p-6">
        {transactionData?.length > 0 ? (
          transactionData.map((transaction) => (
            <div
              onClick={() =>
                navigate(`/transaction?transactionId=${transaction.id}`)
              }
              key={transaction.id}
              className="flex flex-col rounded-lg border  bg-white p-4 shadow-md"
            >
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-primaryColor">
                  Transaksi ID: {transaction.id.toUpperCase()}
                </h2>
                <span
                  className={`rounded-full px-2 py-1 text-white  ${
                    transaction.status === "PENDING_PAYMENT"
                      ? "bg-yellow-500"
                      : transaction.status === "SUCCESS"
                        ? "bg-green-500"
                        : "bg-red-500"
                  }`}
                >
                  {transaction.status === "PENDING_PAYMENT"
                    ? "PESANAN BELUM DIBAYAR"
                    : transaction.status === "SUCCESS"
                      ? "PESANAN SUDAH DIBAYAR"
                      : "PEMBAYARAN DIBATALKAN"}
                </span>
              </div>
              <div className="text-gray-600">
                Total: Rp {transaction.grossAmount?.toLocaleString()}
              </div>
              <div className="mt-2">
                <h3 className="font-semibold text-gray-700">Produk:</h3>
                <ul className="list-disc space-y-1 pl-5">
                  {transaction.products
                    .filter(
                      (product) =>
                        product.name !== "Biaya Pengiriman" &&
                        product.name !== "PPN",
                    ) // Filter to exclude shipping and VAT
                    .map((product) => (
                      <li key={product.id} className="flex justify-between">
                        <span className="text-gray-600">
                          {product.name} (x{product.quantity})
                        </span>
                        <span className="text-gray-600">
                          Rp {product.price?.toLocaleString()}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">Tidak ada transaksi ditemukan.</div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
