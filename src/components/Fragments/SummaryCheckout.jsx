import { useEffect, useMemo } from "react";
import useSubTotal from "../../hooks/useCalculateSubTotal";
import Button from "../Elements/Button";
import { asyncCreateTransaction } from "../../redux/transaction/action";
import { useDispatch, useSelector } from "react-redux";
import useCalculateTotalAmount from "../../hooks/useCalculatedTotalEmount";
import TotalItemCheckout from "../Elements/TotalItemCheckout";

const SummaryCheckout = ({
  carts,
  shippingCost,
  snapShowOpen,
  selectedShippingOption,
  setWeightOrder,
  authUser,
  provinces,
  cities,
}) => {
  const { calculateSubTotal } = useSubTotal();

  const { loading: loadingSnap } = useSelector((state) => state.transaction);
  const dispatch = useDispatch();

  const totalAmount = useCalculateTotalAmount(
    carts,
    calculateSubTotal,
  );

  const totalWeight = useMemo(() => {
    if (!carts || carts.length === 0) {
      return 0;
    }

    return carts.reduce((acc, item) => {
      const weight = item.product.netWeight || 0;
      return acc + weight * item.quantity;
    }, 0);
  }, [carts]);

  useEffect(() => {
    if (totalWeight) {
      setWeightOrder(totalWeight);
    }
  }, [totalWeight, setWeightOrder]);

  const tax = customRound(totalAmount * 0.05);
  const totalWithTax = totalAmount + tax;

  const totalShopping = totalWithTax + shippingCost;

  function customRound(number) {
    const integerPart = Math.floor(number);
    const decimalPart = number - integerPart;
    return decimalPart > 0.5 ? integerPart + 1 : integerPart;
  }

  const getProvinceName = (provinceId) => {
    const province = provinces?.find((p) => p.province_id === provinceId);
    return province ? province.province : "";
  };

  const getCityName = (cityId) => {
    const city = cities?.find((c) => c.city_id === cityId);
    return city ? city.city_name : "";
  };

  const handlePayment = () => {
    dispatch(
      asyncCreateTransaction({
        carts,
        totalShopping,
        tax,
        shippingCost,
        authUser,
        grossAmount: totalShopping,
        customRound,
        shippingCourier: selectedShippingOption?.code,
        shippingService: selectedShippingOption?.service,
        shippingAddress: `${authUser.address}, ${getCityName(authUser.city)}, ${getProvinceName(authUser.province)}, ${authUser.zipCode}, ${authUser.country}`, // Alamat pengiriman
        paymentMethod: "", // Atau metode pembayaran yang dipilih
      }),
    );
  };

  return (
    <>
      {authUser && (
        <div className={`w-full ${!snapShowOpen ? "lg:w-1/2" : "lg:w-full"}`}>
          <h2 className="mb-2 text-lg font-bold text-slate-800 lg:text-xl">
            {!snapShowOpen ? "Ringkasan" : "Silahkan Lakukan Pembayaran"}
          </h2>

          {!snapShowOpen && (
            <div className="flex flex-col gap-3 rounded-lg bg-white px-6 py-4 shadow-lg">
              <div className="flex items-center justify-between gap-2">
                <p className="text-slate-600">Total Harga</p>
                <p>
                  {totalAmount
                    ?.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                    .replace(/,00$/, "")}
                </p>
              </div>
              <div className="flex items-center justify-between gap-2">
                <p className="text-slate-600">Biaya PPN (5%)</p>
                <p>
                  {tax
                    ?.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                    .replace(/,00$/, "")}
                </p>
              </div>
              <div className="flex items-center justify-between gap-2">
                <p className="text-slate-600">Ongkos Kirim</p>
                <p>
                  {shippingCost
                    ?.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                    .replace(/,00$/, "")}
                </p>
              </div>

              <TotalItemCheckout carts={carts} />
              <div className="flex items-center justify-between gap-2 text-base font-bold lg:text-lg">
                <p className="text-slate-600">Total Belanja</p>
                <p>
                  {totalShopping
                    ?.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                    .replace(/,00$/, "")}
                </p>
              </div>
              <Button
                onClick={handlePayment}
                className={`rounded-lg py-3 text-[16px] ${loadingSnap && "cursor-not-allowed opacity-50"} font-semibold`}
                disabled={loadingSnap || shippingCost === 0}
              >
                {!loadingSnap ? "Buat Pesanan" : "Loading..."}
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SummaryCheckout;
