import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  asyncGetOrderByUserId,
  resetOrderData,
} from "../../redux/order/action";
import LoadingPage from "../../pages/loading";
import { formatCurrency } from "../../utils/formatCurrency";
import DataNotFound from "./DataNotFound";

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderData, loading } = useSelector((state) => state.order);
  const { authUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (authUser?._id) {
      // Mengambil transaksi berdasarkan ID pengguna hanya jika orderData kosong
      dispatch(asyncGetOrderByUserId(authUser?._id));
    }
    return () => {
      dispatch(resetOrderData());
    };
  }, [dispatch, authUser]);

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <div className="space-y-4">
      <div className="custom-scrollbar flex max-h-screen cursor-pointer flex-col space-y-4 overflow-y-auto rounded-lg p-6">
        {orderData?.length > 0 ? (
          orderData.map((order) => (
            <div
              onClick={() =>
                navigate(
                  `/order/${order?.shippingNumber !== "" ? order?.shippingNumber : "-"}?order_id=${order.transactionId}&user_id=${order.userId}`,
                )
              }
              key={order.id}
              className="flex flex-col rounded-lg border  bg-white p-4 shadow-md"
            >
              <div className="mb-2 flex items-center justify-between">
                <h2 className="flex-1 font-semibold text-primaryColor lg:text-lg">
                  {order.shippingNumber !== ""
                    ? ` No Resi: ${order.shippingNumber.toUpperCase()}`
                    : `Order Id: ${order.transactionId.toUpperCase()}`}
                </h2>
                <span
                  className={`rounded-full px-2 py-1 text-sm font-semibold text-white lg:text-base ${
                    order.deliveryStatus === "ON_PROCESS"
                      ? "bg-yellow-600"
                      : order.deliveryStatus === "DELIVERED"
                        ? "bg-primaryColor"
                        : order.deliveryStatus === "DELIVERY"
                          ? "bg-gray-500"
                          : "bg-red-500"
                  }`}
                >
                  {order.deliveryStatus === "ON_PROCESS"
                    ? "PESANAN SEDANG DIPROSES"
                    : order.deliveryStatus === "DELIVERED"
                      ? "PESANAN SUDAH DITERIMA"
                      : order.deliveryStatus === "DELIVERY"
                        ? "PESANAN SEDANG DIKIRIM"
                        : "PESANAN DIBATALKAN"}
                </span>
              </div>
              <div className="my-4 text-sm lg:text-lg">
                <h3 className="font-semibold text-gray-700">
                  Total Item{" "}
                  {order.products.filter(
                    (product) =>
                      product.name !== "Biaya Pengiriman" &&
                      product.name !== "PPN",
                  ).length || []}
                </h3>
                <ul className="list-disc space-y-1 pl-5">
                  {order.products
                    .filter(
                      (product) =>
                        product.name !== "Biaya Pengiriman" &&
                        product.name !== "PPN",
                    ) // Filter to exclude shipping and VAT
                    .map((order) => (
                      <li
                        key={order.transactionId}
                        className="flex justify-between gap-3"
                      >
                        <span className="flex-1 text-gray-600">
                          ({order.quantity}) {order.name}
                        </span>
                        <span className="text-gray-600">
                          {formatCurrency(order.price)}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 font-semibold text-gray-600">
                  <h3>Total</h3>
                  <p>{formatCurrency(order.grossAmount)}</p>
                </div>
                <div>
                  <h3 className="text-end">
                    {new Date(order?.createdAt)?.toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: false,
                    })}
                  </h3>
                </div>
              </div>
            </div>
          ))
        ) : (
          <DataNotFound description={"Kamu belum memiliki daftar pesanan!"} />
        )}
      </div>
    </div>
  );
};

export default OrderList;
