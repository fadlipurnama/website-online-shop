import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Elements/Button";
import { useEffect, useState } from "react";
import ModalAddUsername from "./ModalAddUsername";
import defaultUserProfile from "../../assets/default-user-profile.png";
import LazyImage from "../Elements/LazyImage";
import InputForm from "../Elements/Input";
import {
  asyncUpdateUser,
  clearStatusUpdatedActionCreator,
} from "../../redux/updateUserDetail/action";
import useProvinces from "../../hooks/useProvinces"; // Pastikan untuk mengimpor hook
import useCities from "../../hooks/useCities"; // Jika kamu punya custom hook untuk kota

const UserInfo = () => {
  const [openModal, setOpenModal] = useState();
  const { authUser } = useSelector((states) => states.auth);
  const [imageFile, setImageFile] = useState("");
  const [changeProfile, setChangeProfile] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { updateSuccess, loading } = useSelector(
    (states) => states.updateUserDetail,
  );

  const provinces = useProvinces();
  const cities = useCities(authUser?.province);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateData = { imageUrl: imageFile };
    dispatch(asyncUpdateUser(updateData));
  };

  useEffect(() => {
    if (updateSuccess) {
      dispatch(clearStatusUpdatedActionCreator());
      setChangeProfile(false);
    }
  }, [updateSuccess, dispatch]);

  const getProvinceName = (provinceId) => {
    const province = provinces?.find((p) => p.province_id === provinceId);
    return province ? province.province : "";
  };

  const getCityName = (cityId) => {
    const city = cities?.find((c) => c.city_id === cityId);
    console.log("cityId", cityId);
    console.log("city", city);
    return city ? city.city_name : "";
  };

  return (
    <div className="flex min-h-full flex-col rounded-lg border bg-white p-6 text-xs text-gray-800 sm:text-sm lg:gap-y-4 xl:text-base">
      <h2 className="font-bold text-lg lg:text-xl">
        Informasi Akun
      </h2>

      <div className="flex h-full mt-3 md:mt-0 justify-between md:justify-normal w-full gap-5 md:gap-10 lg:gap-20">
        <div className="flex w-1/3 flex-1 md:flex-none flex-col items-center">
          <LazyImage
            src={
              authUser?.imageUrl === ""
                ? defaultUserProfile
                : authUser?.imageUrl
            }
            alt={`userProfile.png`}
            className="max-h-96 min-w-full object-cover"
          />
          {!changeProfile ? (
            <Button
              variant="btn-2"
              className="mt-2 rounded p-2 text-xs sm:text-sm md:text-base"
              onClick={() => setChangeProfile(true)}
            >
              Pilih Foto
            </Button>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col">
              <InputForm
                onChange={(e) => setImageFile(e.target.files[0])}
                type="file"
                className="mt-2 flex-1 rounded p-2 text-xs sm:text-sm md:text-base"
              />
              <div className="flex gap-2">
                <button
                  disabled={loading}
                  type="submit"
                  className="w-full bg-primaryColor py-2 text-white hover:bg-secondaryColor"
                >
                  Submit
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setChangeProfile(false);
                  }}
                  className="w-full bg-red-500 py-2 text-white hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
          <Button
            className="mt-2 rounded p-2 text-xs sm:text-sm md:text-base"
            onClick={() => navigate("ubah-password")}
          >
            Ubah Kata Sandi
          </Button>
        </div>

        <div className="flex flex-col w-1/2 md:grid min-h-max md:flex-1 md:grid-cols-2 gap-x-6 gap-y-10 py-2">
          <div className="flex w-full flex-col gap-1">
            <span className="font-bold">Nama Lengkap</span>
            <p>{`${authUser?.firstName} ${authUser?.lastName}`}</p>
          </div>
          <div className="flex w-full flex-col gap-1">
            <span className="font-bold">Email</span>
            <p>{authUser?.email}</p>
          </div>
          <div className="flex w-full flex-col gap-1">
            <span className="font-bold">Nomor Handphone</span>
            <p>{authUser?.phoneNumber}</p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-bold">Username</span>
            <div className="flex flex-col">
              <p className="">{authUser?.username && authUser.username}</p>
              <button
                onClick={() => {
                  setOpenModal(true);
                  document.body.classList.toggle("overflow-hidden");
                }}
                className={`text-start text-secondaryColor outline-none hover:font-medium`}
              >
                {authUser?.username ? "Ubah Username" : "Tambahkan Username"}
              </button>
            </div>
          </div>

          <div className="col-span-2 flex flex-col gap-1 rounded-lg">
            <span className="font-bold">Alamat</span>
            <div className="flex flex-col justify-between">
              <p className="">
                {authUser?.address &&
                  `${authUser.address}, ${authUser.zipCode}, ${getCityName(authUser.city)}, ${getProvinceName(authUser.province)}, ${authUser.country}`}
              </p>
              {authUser?.address && (
                <Link
                  to="alamat"
                  className="text-secondaryColor hover:font-medium"
                >
                  {authUser.address ? "Ubah Alamat" : "Tambahkan"}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {openModal && (
        <ModalAddUsername
          title={authUser?.username ? "Ubah" : "Tambahkan"}
          setOpenModal={setOpenModal}
          prevUsername={authUser?.username ? authUser.username : ""}
        />
      )}
    </div>
  );
};

export default UserInfo;
