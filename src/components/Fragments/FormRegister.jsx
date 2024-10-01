import Button from "../Elements/Button";
import InputForm from "../Elements/Input";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { asyncRegisterUser } from "../../redux/registerUser/action";
import { useAuthForm } from "../../hooks/useAuthForm";
import Swal from 'sweetalert2'

const FormRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, message } = useSelector((state) => state.register);
  const [formData, handleChange] = useAuthForm();
  const { firstName, lastName, phoneNumber, email, password } = formData;

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(
      asyncRegisterUser(firstName.toLowerCase(), lastName.toLowerCase(), phoneNumber, email, password),
    );
  };

  useEffect(() => {
    if (message === "Registrasi berhasil") {
      Swal.fire({
        icon: "success",
        title: "Pendaftaran berhasil",
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");  // Pindah ke halaman /login setelah tombol OK ditekan
        }
      });
    }
  }, [navigate, message]);
  
  return (
    <form onSubmit={handleRegister} className="grid grid-cols-2 gap-4">
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
        className="text-md appearance-none rounded py-3"
        onChange={handleChange}
      />
      <InputForm
        label="Password"
        type="password"
        name="password"
        placeholder="********"
        className="text-md rounded py-3"
        container="col-span-2"
        onChange={handleChange}
      />
      <p className="col-span-2 mb-3 text-center text-red-500">{message}</p>

      <Button type="submit" variant="btn-1" className="col-span-2 py-3 text-lg">
        {loading ? "Sedang di proses..." : "DAFTAR"}
      </Button>
    </form>
  );
};

export default FormRegister;
