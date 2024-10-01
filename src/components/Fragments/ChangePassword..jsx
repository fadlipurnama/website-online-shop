import { useEffect, useState } from "react";
import InputForm from "../Elements/Input";
import Button from "../Elements/Button";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import {
  asyncChangePassword,
  clearStatusUpdatedActionCreator,
} from "../../redux/updateUserDetail/action";
import Swal from "sweetalert2";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const passwordSchema = z.object({
    oldPassword: z
      .string()
      .min(6, { message: "Password harus minimal 6 karakter" }),
    newPassword: z
      .string()
      .min(6, { message: "Password harus minimal 6 karakter" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password harus minimal 6 karakter" })
      .refine((data) => data === newPassword, {
        message: "Konfirmasi password tidak sama",
      }),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { updateSuccess, loading } = useSelector(
    (state) => state.updateUserDetail,
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { oldPassword, newPassword, confirmPassword };

    try {
      passwordSchema.parse(formData);
      setErrors({});
      dispatch(asyncChangePassword({ oldPassword, newPassword }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = {};
        error.errors.forEach((err) => {
          formattedErrors[err.path[0]] = err.message;
        });
        setErrors(formattedErrors);
      }
    }
  };

  useEffect(() => {
    if (updateSuccess) {
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      dispatch(clearStatusUpdatedActionCreator());
      Swal.fire({
        icon: "success",
        title: "Update Password Berhasil",
        text: "Password berhasil di ubah",
        confirmButtonText: "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/user-profile";
        }
      });
    }
  }, [updateSuccess, dispatch, navigate]);

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-x-4 gap-y-4 text-xs text-gray-800 sm:text-sm md:grid-cols-1 lg:gap-y-8 xl:text-base"
    >
      <h2 className="text-sm font-bold md:text-base lg:text-xl">
        Ganti Kata Sandi
      </h2>
      <InputForm
        label="Kata Sandi Saat Ini"
        name={"oldPassword"}
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        variant={true}
        type="password"
        disabled={loading}
        placeholder="Kata Sandi Saat Ini"
        error={errors.oldPassword}
      />
      <InputForm
        label="Kata Sandi Baru"
        name={"newPassword"}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        variant={true}
        type="password"
        disabled={loading}
        placeholder="Kata Sandi Baru"
        error={errors.newPassword}
      />
      <InputForm
        name={"confirmPassword"}
        label="Konfirmasi Kata Sandi Baru"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        variant={true}
        type="password"
        disabled={loading}
        placeholder="Konfirmasi Kata Sandi Baru"
        error={errors.confirmPassword}
      />
      <Button
        disabled={loading}
        type="submit"
        className="mt-2 rounded p-2 text-xs sm:text-sm md:text-base"
      >
        SIMPAN
      </Button>
    </form>
  );
};

export default ChangePassword;
