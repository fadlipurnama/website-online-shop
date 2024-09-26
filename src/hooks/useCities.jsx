import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncSetCities } from "../redux/shipment/action";

const useCities = (provinceId) => {
  const dispatch = useDispatch();
  const { cities } = useSelector((state) => state.shipment);

  useEffect(() => {
    if (provinceId) {
      dispatch(asyncSetCities(provinceId));
    }
  }, [provinceId, dispatch]);

  return cities;
};

export default useCities;
