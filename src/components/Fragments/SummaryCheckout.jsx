import { useEffect, useMemo, useState } from "react";
import useSubTotal from "../../hooks/useCalculateSubTotal";
import Button from "../Elements/Button";
import LazyImage from "../Elements/LazyImage";
import { asyncCreateTransaction } from "../../redux/transaction/action";
import { useDispatch, useSelector } from "react-redux";
import SnapShowTransaction from "./SnapShowTransaction";

const SummaryCheckout = ({
  carts,
  shippingCost,
  snapShowTrigger,
  setSnapShowOpen,
  snapShowOpen,
  transactionData,
  selectedShippingOption,
  setWeightOrder,
  authUser,
  provinces,
  cities,
}) => {
  const { calculateSubTotal } = useSubTotal();

  const { loading: loadingSnap } = useSelector((state) => state.transaction);
  const [openTotalItem, setOpenTotalItem] = useState(true);
  const dispatch = useDispatch();

  const { totalAmount, totalWeight } = useMemo(() => {
    if (!carts || carts.length === 0) {
      return { totalAmount: 0, totalWeight: 0 };
    }

    const totals = carts.reduce(
      (acc, item) => {
        const price = item.product.price || 0;
        const discount = item.product.discount || 0;
        const quantity = item.quantity || 0;

        const subTotal = calculateSubTotal(price, discount, quantity);

        acc.amount += subTotal;

        const weight = item.product.netWeight || 0;
        acc.weight += weight * quantity;

        return acc;
      },
      { amount: 0, weight: 0 },
    );

    return {
      totalAmount: totals.amount,
      totalWeight: totals.weight,
    };
  }, [carts, calculateSubTotal]);

  useEffect(() => {
    if (totalWeight) {
      setWeightOrder(totalWeight);
    }
  }, [totalWeight, setWeightOrder]);

  const tax = customRound(totalAmount) * 0.11;
  const totalWithTax = customRound(totalAmount) + customRound(tax);

  const totalShopping = customRound(totalWithTax) + customRound(shippingCost);

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
                <p className="text-slate-600">Biaya PPN (11%)</p>
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
              <div className="mb-2 flex flex-col">
                <button
                  onClick={() => setOpenTotalItem(!openTotalItem)}
                  className={`py-1 ${openTotalItem && "font-semibold"} text-start text-slate-600 hover:font-semibold`}
                >
                  Total Item {carts?.length}
                </button>
                {openTotalItem && (
                  <div className="custom-scrollbar flex max-h-72 min-h-max w-full flex-col gap-2 overflow-y-auto p-2">
                    {carts &&
                      carts?.map((item) => (
                        <div
                          className="flex gap-5 rounded-lg border"
                          key={item._id}
                        >
                          <LazyImage
                            src={item.product.imageUrl}
                            className="max-h-36 max-w-36"
                          />
                          <div className="grid grid-cols-2 flex-col gap-2 py-2">
                            <p className="col-span-2 text-lg font-bold text-slate-800 lg:text-xl">
                              {`${item.product.name.substring(0, 40)}...`}
                            </p>
                            <p className="text-base text-slate-800 lg:text-lg">
                              {item.product.brand}
                            </p>

                            <p className=" text-base font-semibold text-primaryColor lg:text-lg">{`${item.quantity} x ${item.product.price}`}</p>

                            <span>
                              <p className="text-base font-semibold text-slate-800 lg:text-lg">
                                Subtotal
                              </p>
                              <p className="order-6 text-base text-slate-800 lg:text-lg">
                                {calculateSubTotal(
                                  item.product.price,
                                  item.product.discount,
                                  item.quantity,
                                )
                                  ?.toLocaleString("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                  })
                                  .replace(/,00$/, "")}
                              </p>
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
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
          <SnapShowTransaction
            snapShowTrigger={snapShowTrigger}
            setSnapShowOpen={setSnapShowOpen}
            transactionData={transactionData}
          />
        </div>
      )}
    </>
  );
};

export default SummaryCheckout;
