import { useSelector } from "react-redux";
import ShippingCheckout from "../components/Fragments/ShippingCheckout";
import SummaryCheckout from "../components/Fragments/SummaryCheckout";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import { useState } from "react";

import useProvinces from "../hooks/useProvinces";
import useCities from "../hooks/useCities";
import LoadingPage from "./loading";

const CheckoutPage = () => {
  const { carts, loading } = useSelector((states) => states.carts);
  const { snapShowTrigger, transactionData } = useSelector(
    (state) => state.transaction,
  );
  const { authUser } = useSelector((states) => states.auth);

  const [selectedShippingOption, setSelectedShippingOption] = useState();
  const [weightOrder, setWeightOrder] = useState(0);
  const [shippingCost, setShippingCost] = useState(0); // Ongkos kirim default
const [snapShowOpen, setSnapShowOpen] = useState(false);

  const provinces = useProvinces();
  const cities = useCities(authUser?.province);

  return (
    <DefaultLayout title="Tersedia Berbagai Barang Elektrik | Checkout">
      <div className="mb-4 flex min-h-[60vh] flex-col-reverse gap-14 lg:flex-row">
        {loading ? (
          <LoadingPage />
        ) : (
          <>
            <SummaryCheckout
              setWeightOrder={setWeightOrder}
              provinces={provinces}
              cities={cities}
              carts={carts}
              setSelectedShippingOption={setSelectedShippingOption}
              selectedShippingOption={selectedShippingOption}
              loading={loading}
              authUser={authUser}
              shippingCost={shippingCost}
              snapShowOpen={snapShowOpen}
              snapShowTrigger={snapShowTrigger}
              setSnapShowOpen={setSnapShowOpen}
              transactionData={transactionData}
            />
            {!snapShowOpen && (
              <ShippingCheckout
                setShippingCost={setShippingCost}
                authUser={authUser}
                provinces={provinces}
                cities={cities}
                setSelectedShippingOption={setSelectedShippingOption}
                selectedShippingOption={selectedShippingOption}
                weightOrder={weightOrder}
              />
            )}
          </>
        )}
      </div>
    </DefaultLayout>
  );
};

export default CheckoutPage;
