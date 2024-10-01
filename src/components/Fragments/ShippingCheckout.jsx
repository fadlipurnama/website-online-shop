import { useDispatch, useSelector } from "react-redux";
import CourierSelect from "../Elements/CourierSelect"; // Import komponen CourierSelect

import { asyncSetShippingOptions } from "../../redux/shipment/action";
import { useEffect, useState } from "react";
import ShippingOptionSelect from "../Elements/ShippingOptionSelect";

const ShippingCheckout = ({
  weightOrder,
  authUser,
  provinces,
  cities,
  setShippingCost,
  selectedShippingOption,
  setSelectedShippingOption,
}) => {
  const dispatch = useDispatch();
  const origin = "456";

  // State untuk menyimpan kurir yang dipilih
  const [selectedCourier, setSelectedCourier] = useState(null);

  const getProvinceName = (provinceId) => {
    const province = provinces?.find((p) => p.province_id === provinceId);
    return province ? province.province : "";
  };

  const getCityName = (cityId) => {
    const city = cities?.find((c) => c.city_id === cityId);
    return city ? city.city_name : "";
  };

  const { shippingOptions, loading } = useSelector((state) => state.shipment);

  useEffect(() => {
    if (authUser && selectedCourier && weightOrder !== 0) {
      dispatch(
        asyncSetShippingOptions({
          origin,
          destination: authUser.city,
          weight: weightOrder,
          courier: selectedCourier ? selectedCourier.code : "jne",
          destinationType: "city",
          originType: "city",
        }),
      );
    }
  }, [authUser, dispatch, selectedCourier, weightOrder]);

  const couriers = [
    { code: "jne", name: "JNE" },
    { code: "jnt", name: "JNT" },
    { code: "sicepat", name: "SiCepat" },
    { code: "pos", name: "Pos Indonesia" },
    { code: "tiki", name: "Tiki" },
    { code: "anteraja", name: "Anteraja" },
  ];

  return (
    <div className="borde w-full lg:w-1/2">
      {authUser && (
        <>
          <h2 className="mb-2 text-lg font-bold text-slate-800 lg:text-xl">
            Pengiriman
          </h2>
          <div className="flex flex-col rounded-lg bg-white px-6 py-4 shadow-lg">
            <h3 className="mb-2 text-base font-semibold lg:text-lg">{`Alamat - ${authUser.firstName} ${authUser.lastName}`}</h3>
            <p>{`${authUser.address}, ${getCityName(authUser.city)}, ${getProvinceName(authUser.province)}, ${authUser.zipCode}, ${authUser.country}`}</p>
            <p>{authUser.phoneNumber}</p>

            <CourierSelect
              couriers={couriers}
              selectedCourier={selectedCourier}
              setSelectedCourier={setSelectedCourier}
            />

            <ShippingOptionSelect
            setShippingCost={setShippingCost}
              label="Pengiriman"
              weightOrder={weightOrder}
              originCityName={getCityName(origin)}
              disabled={!selectedCourier || loading}
              value={selectedShippingOption?.value}
              options={shippingOptions?.flatMap((option) =>
                option.costs.map((cost) => ({
                  label: `${option.name} - ${cost.service}`,
                  service: cost.service,
                  value: cost,
                  code: option.code,
                  price: cost.cost[0].value,
                  estimasi: cost.cost[0].etd,
                })),
              )}
              placeholder="Pilih Pengiriman"
              className="mt-2 rounded-lg border px-3 py-2"
              onChange={(e) => {
                setSelectedShippingOption(e.target.value);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ShippingCheckout;
