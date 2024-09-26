import { useLocation, useParams } from "react-router-dom";
import DetailOrderLayout from "../components/Layouts/DetailOrderLayout";
import { useEffect } from "react";
import { asyncGetOrdersByUserId, resetOrderData } from "../redux/order/action";
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from "./loading";

const DetailOrderPage = () => {
  const {orderId} = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const dispatch = useDispatch()

  const userId = queryParams.get("user_id");
  console.log(location)
//   const dispatch = useDispatch();
  const { orderData, loading } = useSelector(
    (state) => state.order,
  );


  useEffect(() => {
    if (userId) {
      dispatch(asyncGetOrdersByUserId(userId)); 
    }

    return () => {
      dispatch(resetOrderData());
    };
  }, [userId, dispatch]);

  

  return (
    <DetailOrderLayout
      pathLocation={`${location.pathname}${location.search}`}
      orderId={orderId}
    >
      <div className="w-full min-h-[75vh] rounded-lg bg-white pb-6">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Detail Order
        </h2>
        {loading && <LoadingPage />}
        {orderData && (
          <div className="flex min-w-full flex-col-reverse justify-between gap-6 lg:flex-row lg:gap-0">
            <div className="flex w-full flex-col justify-between lg:w-[45%]">
              <div>
                <h3 className="font-bold text-gray-700">Order ID:</h3>
                <p className="text-gray-600">{orderData.orderId}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-700">order ID:</h3>
                <p className="text-gray-600">{orderId}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-700">Status:</h3>
                <span
                  className={`rounded-md px-2 py-1 text-white ${
                    orderData.status === "PENDING_PAYMENT"
                      ? "bg-yellow-500"
                      : orderData.status === "SUCCESS"
                        ? "bg-green-500"
                        : "bg-red-500"
                  }`}
                >
                  {orderData.status === "PENDING_PAYMENT"
                    ? "PESANAN BELUM DIBAYARr"
                    : orderData.status === "SUCCESS"
                      ? "PESANAN SUDAH DIBAYAR"
                      : "PEMBAYARAN DIBATALKAN"}
                </span>
              </div>
              <div className="mt-6 rounded-md bg-gray-50 p-4">
                <h3 className="mb-4 text-lg font-semibold text-gray-800">
                  Total Pembayaran
                </h3>
                <div className="text-right text-xl font-bold text-gray-900">
                  Rp{orderData.grossAmount?.toLocaleString()}
                </div>
              </div>
              {/* {orderData.status !== "SUCCESS" && (
                <Button
                  // onClick={handleSnapOpen}
                  className="rounded-lg py-4 text-[16px] font-semibold"
                >
                  Selesaikan Pembayaran
                </Button>
              )} */}
            </div>

            <div className="wfull lg:w-[45%]">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">
                Produk yang Dibeli
              </h3>
              <div className="space-y-4">
                {orderData.products?.map((product) => (
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
    </DetailOrderLayout>
  );
};

export default DetailOrderPage;
