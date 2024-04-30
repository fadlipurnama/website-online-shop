import { useEffect } from "react";
import Button from "../Elements/Buttons";
import InputForm from "../Elements/Input";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuthErrorMessage } from "../../hooks/useAuth/message";
import { asyncLoginUser, clearState } from "../../redux/users/action";
import { useAuthForm } from "../../hooks/useAuth/form";

const FormLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errorMessage = useAuthErrorMessage();
  const { token, loading } = useSelector((state) => state.users);
  const [formData, handleChange, resetFormData] = useAuthForm();
  const { email, password } = formData;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(asyncLoginUser(email, password));
  };

  useEffect(() => {
    if (token) {
      resetFormData();
      dispatch(clearState());
      navigate("/");
    }
  }, [token, navigate, dispatch, resetFormData]);

  return (
    <form onSubmit={handleLogin}>
      <InputForm
        label="Email"
        type="email"
        name="email"
        placeholder="Masukan email"
        className="text-md rounded py-3"
        onChange={handleChange}
      />
      <InputForm
        label="Password"
        type="password"
        name="password"
        placeholder="********"
        className="text-md rounded py-3"
        onChange={handleChange}
      />
      <p className="mb-3 text-center text-red-500">{errorMessage}</p>

      <Button type="submit" variant="btn-1" className="py-3">
        {loading ? "Sedang di proses..." : "MASUK"}
      </Button>
    </form>
  );
};

export default FormLogin;
