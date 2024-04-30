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
      asyncRegisterUser(firstName, lastName, phoneNumber, email, password),
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
        className="text-md rounded py-3"
        onChange={handleChange}
      />
      <InputForm
        label="Nama Belakang"
        type="text"
        name="lastName"
        placeholder="Masukan nama belakang"
        className="text-md rounded py-3"
        onChange={handleChange}
      />
      <InputForm
        label="Email"
        type="email"
        name="email"
        placeholder="example@mail.com"
        className="text-md rounded py-3"
        onChange={handleChange}
      />
      <InputForm
        label="Nomor Handphone"
        type="number"
        name="phoneNumber"
        placeholder="Masukan No.Handphone"
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

      <Button type="submit" variant="btn-1" className="py-3 text-lg">
        {loading ? "Sedang di proses..." : "DAFTAR"}
      </Button>
    </form>
  );
};

export default FormRegister;
