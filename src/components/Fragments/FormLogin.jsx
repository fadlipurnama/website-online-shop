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
        className="rounded border py-2"
        onChange={handleChange}
      />
      <InputForm
        label="Password"
        type="password"
        name="password"
        placeholder="********"
        className="rounded border py-2"
        onChange={handleChange}
      />
      <p className="text-red-500 text-center mb-3">{errorMessage}</p>

      <Button type="submit" variant="btn-1" className="py-2">
        {loading ? "Sedang di proses..." : "Login"}
      </Button>
    </form>
  );
};

export default FormLogin;
