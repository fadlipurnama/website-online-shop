import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export const useAuthErrorMessage = (defaultValue = "") => {
  const { error } = useSelector((state) => state.users);
  const [errorMessage, setErrorMessage] = useState(defaultValue);
  const location = useLocation();

  useEffect(() => {
    const paramsToCheck = [
      "firstName",
      "lastName",
      "email",
      "password",
      "phoneNumber",
    ];

    let errorData = "";
    if (error && error.error && Array.isArray(error.error)) {
      paramsToCheck.some((param) => {
        const findError = error.error.find((err) => err.param === param);
        if (findError) {
          errorData = findError.msg;
          return true;
        }
        return false;
      });
    }
    
    if (!errorData && error && error.error) {
      errorData = error.error;
    }
    setErrorMessage(errorData);
  }, [error]);


  useEffect(() => {
    setErrorMessage("");
  }, [location.pathname]);

  return errorMessage;
};
