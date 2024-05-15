import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearStateRegister } from "../redux/registerUser/action";
import { useLocation, useNavigate } from "react-router-dom";
// import { clearStateLogin } from "../redux/auth/action";

export const useFormRoleAdmin = () => {
  const { authUser } = useSelector((states) => states.auth);
  const navigate = useNavigate();
//   const location = useLocation();

//   const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    category: "",
    imageUrl: "",
    rating: "",
    promo: false,
    isActive: true,
    stock: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetFormData = () => {
    setFormData({
      name: "",
      brand: "",
      price: "",
      category: "",
      imageUrl: "",
      rating: "",
      promo: false,
      isActive: true,
      stock: "",
      description: "",
    });
  };

  useEffect(() => {
    if (authUser.isAdmin === false) {
      navigate("/");
    }
  }, [navigate, authUser]);

  return [formData, handleChange, resetFormData];
};
