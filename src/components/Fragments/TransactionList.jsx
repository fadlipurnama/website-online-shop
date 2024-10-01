import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  asyncGetTransactionsByUserId,
  resetTransactionData,
} from "../../redux/transaction/action";
import LoadingPage from "../../pages/loading";
import { formatCurrency } from "../../utils/formatCurrency";
import DataNotFound from "./DataNotFound";

const TransactionList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { transactionData, loading } = useSelector(
    (state) => state.transaction,
  );
  const { authUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (authUser?._id) {
      // Mengambil transaksi berdasarkan ID pengguna hanya jika transactionData kosong
      dispatch(asyncGetTransactionsByUserId(authUser._id));
    }
    return () => {
      dispatch(resetTransactionData()); // Reset data saat komponen unmount
    };
  }, [dispatch, authUser]);

  // Menampilkan loading state
  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="space-y-4">
      <div className="custom-scrollbar flex max-h-screen cursor-pointer flex-col space-y-4 overflow-y-auto rounded-lg p-6">
        {transactionData?.length > 0 ? (
          transactionData.map((transaction) => (
            <div
              onClick={() =>
                navigate(
                  `/transaction?transaction_id=${transaction.id}&status_code=201&transaction_status=${
                    transaction.status === "PENDING_PAYMENT"
                      ? "pending"
                      : transaction.status === "PAID"
                        ? "settlement"
                        : "error"
                  }`,
                )
              }
              key={transaction.id}
              className="flex flex-col rounded-lg border  bg-white p-4 shadow-md"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <h2 className="flex-1 font-semibold text-primaryColor lg:text-lg">
                  Transaksi ID: {transaction.id.toUpperCase()}
                </h2>
                <span
                  className={`rounded-full px-2 py-1 text-sm font-semibold text-white lg:text-base  ${
                    transaction.status === "PENDING_PAYMENT"
                      ? "bg-yellow-600"
                      : transaction.status === "PAID"
                        ? "bg-primaryColor"
                        : "bg-red-500"
                  }`}
                >
                  {transaction.status === "PENDING_PAYMENT"
                    ? "PESANAN BELUM DIBAYAR"
                    : transaction.status === "PAID"
                      ? "PEMBAYARAN BERHASIL"
                      : "PEMBAYARAN DIBATALKAN"}
                </span>
              </div>
              <div className="my-4 text-sm lg:text-lg">
                <h3 className="font-semibold text-gray-700">
                  Total Item{" "}
                  {transaction.products.filter(
                    (product) =>
                      product.name !== "Biaya Pengiriman" &&
                      product.name !== "PPN",
                  ).length || []}
                </h3>
                <ul className="list-disc space-y-1 pl-5">
                  {transaction.products
                    .filter(
                      (product) =>
                        product.name !== "Biaya Pengiriman" &&
                        product.name !== "PPN",
                    ) // Filter to exclude shipping and VAT
                    .map((product) => (
                      <li
                        key={product.id}
                        className="flex justify-between gap-3"
                      >
                        <span className="flex-1 text-gray-600">
                          ({product.quantity}) {product.name}
                        </span>
                        <span className="text-gray-600">
                          {formatCurrency(product.price)}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 font-semibold text-gray-600">
                  <h3>Total</h3>
                  <p>{formatCurrency(transaction.grossAmount)}</p>
                </div>
                <div>
                  <h3 className="text-end">
                    {new Date(transaction?.createdAt)?.toLocaleDateString(
                      "id-ID",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false,
                      },
                    )}
                  </h3>
                </div>
              </div>
            </div>
          ))
        ) : (
         <DataNotFound description={"Kamu belum memiliki daftar transaksi!"}/>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
