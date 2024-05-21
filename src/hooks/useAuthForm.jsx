import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearStateRegister } from "../redux/registerUser/action";
import { useLocation, useNavigate } from "react-router-dom";
import { clearStateLogin } from "../redux/login/action";

export const useAuthForm = () => {
  const { authUser } = useSelector((states) => states.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const resetFormData = () => {
    setFormData({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
    });
  };

  useEffect(() => {
    if (authUser) {
      navigate("/");
    }
  }, [navigate, authUser]);

  useEffect(() => {
    dispatch(clearStateRegister());
    dispatch(clearStateLogin());
    resetFormData();
  }, [location.pathname, dispatch]);

  return [formData, handleChange, resetFormData];
};
