import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncSetAuthUser,
  asyncUnsetAuthUser,
} from "../../redux/authUser/action";

const useGetDataUser = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  const [alertShown, setAlertShown] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(asyncSetAuthUser(token));
    }

    if (!alertShown && (error === "Invalid token." || error)) {
      setAlertShown(true);
      localStorage.removeItem("accessToken");
      dispatch(asyncUnsetAuthUser());
      alert("Sesi telah berakhir, silahkan login kembali");
      window.location.href = "/login";
    }
  }, [dispatch, error, alertShown]);
};

export default useGetDataUser;
