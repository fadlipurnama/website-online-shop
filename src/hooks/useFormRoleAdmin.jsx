import { useState } from "react";
import { useSelector } from "react-redux";

export const useFormRoleAdmin = () => {
  const { authUser } = useSelector((states) => states.auth);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    category: "",
    imageUrl: "",
    author: `${authUser?.firstName} ${authUser?.lastName}`,
    rating: 0,
    discount: "",
    best: false,
    isActive: true,
    stock: "",
    description: "",
  });

 
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "discount") {
      // Memastikan nilai tidak lebih dari 100
      const newValue = Math.min(value, 100);
      setFormData({ ...formData, [name]: newValue });
    } else if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else if (name === "imageUrl" && files) {
      const imageUrl = files[0];
      setFormData({
        ...formData,
        imageUrl,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return [formData, handleChange, setFormData];
};
