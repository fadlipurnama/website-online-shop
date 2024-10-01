import { useLocation, useNavigate } from "react-router-dom";
import DetailOrderLayout from "../components/Layouts/DetailOrderLayout";
import { useEffect } from "react";
import { asyncGetOrderById, resetOrderData } from "../redux/order/action";
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from "./loading";
import { formatCurrency } from "../utils/formatCurrency";
import TotalItemOrder from "../components/Elements/TotalItemOrder";
import DataNotFound from "../components/Fragments/DataNotFound";

const DetailOrderPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("order_id");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orderData, loading } = useSelector((state) => state.order);

  useEffect(() => {
    if (orderId) {
      dispatch(asyncGetOrderById(orderId));
    }

    return () => {
      dispatch(resetOrderData());
    };
  }, [orderId, dispatch]);
  const filteredCost =
    orderData?.products?.filter(
      (product) =>
        product.name === "PPN" || product.name === "Biaya Pengiriman",
    ) || [];

  return (
    <DetailOrderLayout
      pathLocation={`${location.pathname}${location.search}`}
      orderId={orderId}
    >
      <div className="my-4 w-full rounded-lg bg-white px-6 pb-6">
        {loading ? (
          <LoadingPage />
        ) : orderData ? (
          <>
            <div className="mb-4 flex w-full flex-col-reverse items-start justify-between sm:flex-row">
              <div className="grid flex-1 gap-2 lg:grid-cols-2">
                <div className="text-base lg:text-lg">
                  <h3 className="font-bold text-gray-700">Order ID</h3>
                  <p className="text-gray-600">{orderId?.toUpperCase()}</p>
                </div>
                <div className="text-base lg:text-lg">
                  <h3 className="font-bold text-gray-700">No Resi</h3>
                  <p className="text-gray-600">
                    {orderData.shippingNumber !== ""
                      ? orderData.shippingNumber?.toUpperCase()
                      : "-"}
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-700">Kurir</h3>
                  <p className="text-gray-600">
                    {orderData.shippingCourier?.toUpperCase()} -{" "}
                    {orderData.shippingService?.toUpperCase()}
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-gray-700">Metode Pembayaran</h3>
                  <p className="text-gray-600">
                    {orderData.paymentMethod !== ""
                      ? orderData.paymentMethod?.toUpperCase()
                      : "-"}
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-700">Tanggal Pemesanan</h3>
                  <p className="text-gray-600">
                    {new Date(orderData?.createdAt)?.toLocaleDateString(
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
                  </p>
                </div>
                <div>
                  <h3 className="col-span-2 font-bold text-gray-700">
                    Alamat Pengiriman
                  </h3>
                  <p className="text-gray-600">{orderData.shippingAddress}</p>
                </div>
                {(orderData.deliveryStatus === "DELIVERY" ||
                  orderData.deliveryStatus === "DELIVERED") && (
                  <div
                    onClick={() =>
                      navigate(
                        `/tracking?no_resi=${orderData.shippingNumber}&courier=${orderData.shippingCourier}`,
                      )
                    }
                    className="cursor-pointer text-base font-bold text-primaryColor lg:text-lg"
                  >
                    Lihat Detail Pengiriman
                  </div>
                )}
              </div>
              <span
                className={`rounded-md px-2 py-1 text-base text-white lg:text-lg ${
                  orderData.deliveryStatus === "ON_PROCESS"
                    ? "bg-yellow-600"
                    : orderData.deliveryStatus === "DELIVERED"
                      ? "bg-primaryColor"
                      : orderData.deliveryStatus === "DELIVERY"
                        ? "bg-gray-500"
                        : "bg-red-500"
                }`}
              >
                {orderData.deliveryStatus === "ON_PROCESS"
                  ? "PESANAN SEDANG DIPROSES"
                  : orderData.deliveryStatus === "DELIVERED"
                    ? "PESANAN SUDAH DITERIMA"
                    : orderData.deliveryStatus === "DELIVERY"
                      ? "PESANAN SEDANG DIKIRIM"
                      : "PESANAN DIBATALKAN"}
              </span>
            </div>
            <div className="mb-4 flex w-full min-w-full flex-col gap-4 rounded-lg bg-gray-100 p-4 lg:gap-10">
              <TotalItemOrder orderData={orderData} />

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
                  {formatCurrency(orderData.grossAmount)}
                </p>
              </div>
            </div>
          </>
        ) : (
          <DataNotFound
            title={"Data tidak ditemukan"}
            description={"Informasi pesanan yang kamu cari tidak ada."}
          />
        )}
      </div>
    </DetailOrderLayout>
  );
};

export default DetailOrderPage;
