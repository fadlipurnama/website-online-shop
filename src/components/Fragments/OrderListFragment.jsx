import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { asyncGetOrdersByUserId, resetOrderData } from "../../redux/order/action";
import LoadingPage from "../../pages/loading";

const OrderList = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderData, loading } = useSelector((state) => state.order);
  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      // Mengambil transaksi berdasarkan ID pengguna hanya jika orderData kosong
        dispatch(asyncGetOrdersByUserId(userId));
    }
    return () => {
      dispatch(resetOrderData()); // Reset data saat komponen unmount
    };
  }, [dispatch, userId]);

  // Menampilkan loading state
  if (loading) {
    return <LoadingPage />;
  }
  return (
    <div className="space-y-4">
      <div className="flex overflow-y-auto max-h-screen custom-scrollbar flex-col space-y-4 rounded-lg p-6">
        {orderData?.length > 0 ? (
          orderData.map((order) => (
            <div
              onClick={() =>
                navigate(`/order/${order.shippingNumber}?order_id=${order._id}?user_id=${order.userId}`)
              }
              key={order.id}
              className="flex flex-col rounded-lg border  bg-white p-4 shadow-md"
            >
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-primaryColor">
                  No Resi: {order.shippingNumber.toUpperCase()}
                </h2>
                <span
                  className={`rounded-full px-2 py-1 text-white  ${
                    order.status === "DIKIRIM"
                      ? "bg-yellow-500"
                      : order.status === "SELESAI"
                        ? "bg-green-500"
                        : "bg-red-500"
                  }`}
                >
                  {order.status === "DIKIRIM"
                    ? "PESANAN SEDANG DIKIRIM"
                    : order.status === "SELESAI"
                      ? "PESANAN SAMPAI"
                      : "PESANAN DIBATALKAN"}
                </span>
              </div>
              <div className="text-gray-600">
                Total: Rp {order.grossAmount?.toLocaleString()}
              </div>
              <div className="mt-2">
                <h3 className="font-semibold text-gray-700">Produk:</h3>
                <ul className="list-disc space-y-1 pl-5">
                  {order.products
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
          <div className="text-center">Pesanan tidak ditemukan.</div>
        )}
      </div>
    </div>
  )
}

export default OrderList
