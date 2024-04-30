import Button from "../Elements/Buttons";
import InputForm from "../Elements/Input";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuthErrorMessage } from "../../hooks/useAuth/message";
import { clearState, asyncRegisterUser } from "../../redux/users/action";
import { useAuthForm } from "../../hooks/useAuth/form";

const FormRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errorMessage = useAuthErrorMessage("");
  const { loading, token } = useSelector((state) => state.users);
  const [formData, handleChange, resetFormData] = useAuthForm();
  const { firstName, lastName, phoneNumber, email, password } = formData;

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(
      asyncRegisterUser(firstName, lastName, phoneNumber, email, password)
    );
  };

  useEffect(() => {
    if (token) {
      resetFormData();
      dispatch(clearState());
      navigate("/login");
    }
  }, [token, navigate, dispatch, resetFormData]);

  return (
    <form onSubmit={handleRegister}>
      <InputForm
        label="Nama Depan"
        type="text"
        name="firstName"
        placeholder="Masukan nama depan"
        className="rounded border py-2"
        onChange={handleChange}
      />
      <InputForm
        label="Nama Belakang"
        type="text"
        name="lastName"
        placeholder="Masukan nama belakang"
        className="rounded border py-2"
        onChange={handleChange}
      />
      <InputForm
        label="Email"
        type="email"
        name="email"
        placeholder="example@mail.com"
        className="rounded border py-2"
        onChange={handleChange}
      />
      <InputForm
        label="Nomor Handpone"
        type="number"
        name="phoneNumber"
        placeholder="********"
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

      <Button type="submit" className="py-2" variant="btn-1">
        {loading ? "Sedang di proses..." : "Register"}
      </Button>
    </form>
  );
};

export default FormRegister;
