import Button from "../Elements/Buttons";
import InputForm from "../Elements/Input";
import { useDispatch, useSelector } from "react-redux";
import { asyncLoginUser } from "../../redux/login/action";
import { useAuthForm } from "../../hooks/useAuthForm";

const FormLogin = () => {
  const dispatch = useDispatch();
  const { loading, message } = useSelector((states) => states.login);
  const [formData, handleChange] = useAuthForm();
  const { email, password } = formData;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(asyncLoginUser(email, password));
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <InputForm
        label="Email"
        type="email"
        name="email"
        placeholder="Masukkan email"
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
      <p className="col-span-2 mb-3 text-center text-red-500">{message}</p>

      <Button type="submit" variant="btn-1" className="py-3">
        {loading ? "Sedang di proses..." : "MASUK"}
      </Button>
    </form>
  );
};

export default FormLogin;
