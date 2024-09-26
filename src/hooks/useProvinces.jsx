import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncSetProvinces } from "../redux/shipment/action";

const useProvinces = () => {
  const dispatch = useDispatch();
  const { provinces } = useSelector((state) => state.shipment);

  useEffect(() => {
    dispatch(asyncSetProvinces());
  }, [dispatch]);

  return provinces;
};

export default useProvinces;
