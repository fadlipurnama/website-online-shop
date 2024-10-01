import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { asyncSetTracking } from "../redux/shipment/action"; // Ganti dengan path yang sesuai
import TrackingManifest from "../components/Fragments/TrackingManifest";
import DetailTrackingLayout from "../components/Layouts/DetailTrackingLayout";
import useProvinces from "../hooks/useProvinces";
import useCities from "../hooks/useCities";
import LoadingPage from "./loading";
import DataNotFound from "../components/Fragments/DataNotFound";

const TrackingPage = () => {
  const dispatch = useDispatch();
  const { trackingData, loading } = useSelector((state) => state.shipment);

  const { authUser } = useSelector((state) => state.auth);
  const provinces = useProvinces();
  const cities = useCities(authUser?.province);

  // Mengambil query parameters dari URL
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const waybillNumber = query.get("no_resi");
  const courier = query.get("courier");

  const getProvinceName = (provinceId) => {
    const province = provinces?.find((p) => p.province_id === provinceId);
    return province ? province.province : "";
  };

  const getCityName = (cityId) => {
    const city = cities?.find((c) => c.city_id === cityId);
    return city ? city.city_name : "";
  };

  useEffect(() => {
    if (waybillNumber && courier) {
      dispatch(asyncSetTracking({ waybill: waybillNumber, courier }));
    }
  }, [dispatch, waybillNumber, courier]);

  return (
    <DetailTrackingLayout waybillNumber={waybillNumber} courier={courier}>
      {loading && <LoadingPage />}
      {trackingData ? (
        <div className="flex flex-col rounded-xl border-2 p-4 lg:flex-row xl:p-8">
          <div
            className="hidden w-full flex-col
         lg:block lg:w-1/2"
          >
            <h2 className="mb-10 text-2xl font-bold">Alamat Pengiriman</h2>
            <h3 className="text-xl font-semibold">Muhammad Fadli Purnama</h3>
            <p className="text-lg">{`${authUser.address}, ${getCityName(authUser.city)}, ${getProvinceName(authUser.province)}, ${authUser.zipCode}, ${authUser.country}`}</p>
            <p className="text-lg">{authUser.phoneNumber}</p>
          </div>
          <div className="flex w-full flex-col lg:w-1/2">
            <div className="text-end text-sm font-semibold md:text-base lg:text-lg">
              <h2>No Resi: {trackingData?.summary.waybill_number}</h2>
              <h2>{trackingData?.summary.courier_name}</h2>
              <h2>{trackingData?.details.waybill_date}</h2>
            </div>
            {trackingData && <TrackingManifest trackingData={trackingData} />}
          </div>
        </div>
      ) : (
        <DataNotFound
          title={"Data tidak ditemukan"}
          description={"Informasi tracking pesanan yang kamu cari tidak ada."}
        />
      )}
    </DetailTrackingLayout>
  );
};

export default TrackingPage;
