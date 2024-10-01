import { useEffect, useState } from "react";
import Button from "../Elements/Button";
import InputForm from "../Elements/Input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  asyncUpdateProfileUser,
  clearStatusUpdatedActionCreator,
} from "../../redux/updateUserDetail/action";
import Swal from "sweetalert2";

const addressSchema = z.object({
  firstName: z.string().min(1, "*Masukkan nama depan"),
  lastName: z.string().min(1, "*Masukkan nama belakang"),
  phoneNumber: z.string().min(1, "*Masukkan no handphone"),
  email: z.string().email("*Masukkan email yang valid"),
});

const SettingProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLocalStorageData, setIsLocalStorageData] = useState(false);

  const { authUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    updateSuccess,
    message,
    loading: updateDataLoading,
  } = useSelector((states) => states.updateUserDetail);

  // Load data dari authUser ke localStorage saat komponen dimuat
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("profileData"));

    if (savedData) {
      setFirstName(savedData.firstName);
      setLastName(savedData.lastName);
      setPhoneNumber(savedData.phoneNumber);
      setEmail(savedData.email);
    } else if (authUser) {
      const initialData = {
        firstName: authUser.firstName || "",
        lastName: authUser.lastName || "",
        phoneNumber: authUser.phoneNumber || "",
        email: authUser.email || "",
      };

      localStorage.setItem("profileData", JSON.stringify(initialData));
      setFirstName(initialData.firstName);
      setLastName(initialData.lastName);
      setPhoneNumber(initialData.phoneNumber);
      setEmail(initialData.email);
    }

    return () => {
      localStorage.removeItem("profileData");
    };
  }, [authUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { firstName, lastName, phoneNumber, email };

    try {
      addressSchema.parse(formData);
      setErrors({});

      const oldData = JSON.parse(localStorage.getItem("profileData")) || {};

      const isDataChanged =
        JSON.stringify(oldData) !== JSON.stringify(formData);

      localStorage.setItem("profileData", JSON.stringify(formData));

      if (isDataChanged) {
        setIsLocalStorageData(true);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = {};
        error.errors.forEach((err) => {
          formattedErrors[err.path[0]] = err.message;
        });
        setErrors(formattedErrors);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const handleConfirmPassword = async (e) => {
    e.preventDefault();
    dispatch(
      asyncUpdateProfileUser({
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
      }),
    );
  };

  useEffect(() => {
    if (updateSuccess) {
      Swal.fire({
        icon: "success",
        title: "Update Data Berhasil",
        text: "Data profile berhasil di ubah.",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/user-profile";
        }
      });
      dispatch(clearStatusUpdatedActionCreator());
      localStorage.removeItem("profileData");
    }
  }, [updateSuccess, updateDataLoading, message, navigate, dispatch]);

  return (
    <>
      {!isLocalStorageData ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-x-4 gap-y-4 text-xs text-gray-800 sm:text-sm lg:gap-y-8 xl:text-base"
        >
          <h2 className="text-sm font-bold md:col-span-2 md:text-base lg:text-xl">
            Setting Profile
          </h2>

          <InputForm
            variant={true}
            label="Nama Depan"
            value={firstName}
            name="firstName"
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Nama Depan"
            error={errors.firstName}
          />
          <InputForm
            variant={true}
            label="Nama Belakang"
            value={lastName}
            name="lastName"
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Nama Belakang"
            error={errors.lastName}
          />
          <InputForm
            variant={true}
            label="Email"
            value={email}
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            error={errors.email}
          />
          <InputForm
            variant={true}
            label="No Handphone"
            value={phoneNumber}
            name="phoneNumber"
            type="text"
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="No Handphone"
            error={errors.phoneNumber}
          />

          <Button
            disabled={updateDataLoading}
            type="submit"
            className="col-span-2 mt-2 rounded p-2 text-xs sm:text-sm md:text-base"
          >
            SIMPAN
          </Button>
        </form>
      ) : (
        <form
          onSubmit={handleConfirmPassword}
          className="flex flex-col gap-x-4 gap-y-4 text-xs text-gray-800 sm:text-sm lg:gap-y-8 xl:text-base"
        >
          <h2 className="text-sm font-bold md:col-span-2 md:text-base lg:text-xl">
            Konfirmasi Password
          </h2>
          <InputForm
            variant={true}
            label="Konfirmasi Password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Konfirmasi Password"
            error={message}
          />
          <Button
            type="submit"
            className="mt-2 rounded p-2 text-xs sm:text-sm md:text-base"
          >
            KONFIRMASI
          </Button>
        </form>
      )}
    </>
  );
};

export default SettingProfile;
