import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Elements/Button";
import { useState } from "react";
import ModalAddUsername from "./ModalAddUsername";

const UserInfo = () => {
  const [openModal, setOpenModal] = useState();
  const { authUser } = useSelector((states) => states.auth);
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 gap-x-16 gap-y-4 bg-white text-xs text-gray-800 sm:text-sm md:grid-cols-2 lg:gap-y-8 xl:text-base">
      <h2 className="text-sm font-bold md:col-span-2 md:text-base lg:text-xl">
        Indormasi Akun
      </h2>
      <div className="flex flex-col gap-1 rounded-lg bg-gray-100 px-6 py-2">
        <span className="font-semibold">Nama Depan</span>
        <p>{authUser?.firstName}</p>
      </div>
      <div className="flex flex-col gap-1 rounded-lg bg-gray-100 px-6 py-2">
        <span className="font-semibold">Nama Belakang</span>
        <p>{authUser?.lastName}</p>
      </div>
      <div className="flex flex-col gap-1 rounded-lg bg-gray-100 px-6 py-2">
        <span className="font-semibold">Email</span>
        <p>{authUser?.email}</p>
      </div>
      <div className="flex flex-col gap-1 rounded-lg bg-gray-100 px-6 py-2">
        <span className="font-semibold">Nomor Handphone</span>
        <p>{authUser?.phoneNumber}</p>
      </div>
      <div className="flex flex-col row-span-2 gap-1 rounded-lg bg-gray-100 px-6 py-2">
        <span className="font-semibold">Alamat</span>
        <div className="flex items-center justify-between">
          <p className="">{authUser?.address ? `${authUser.address}, ${authUser.zipCode}, ${authUser.city}, ${authUser.province}, ${authUser.country}` : "-"}</p>
          {authUser && !authUser.address && (
            <Link
              to="alamat"
              className="font-light hover:font-normal hover:text-secondaryColor"
            >
              Tambahkan
            </Link>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1 rounded-lg bg-gray-100 px-6 py-2">
        <span className="font-semibold">Username</span>
        <div className="flex items-center justify-between">
          <p className="">{authUser?.username ? authUser.username : "-"}</p>
          <button
            onClick={() => {
              setOpenModal(true);
              document.body.classList.toggle("overflow-hidden");
            }}
            className="font-light outline-none hover:font-normal hover:text-secondaryColor"
          >
            {authUser?.username ? "Ubah" : "Tambahkan"}
          </button>
        </div>
      </div>
    

      <Button
        className="mt-2 rounded p-2 text-xs sm:text-sm md:text-base"
        onClick={() => navigate("ubah-password")}
      >
        Ubah Password
      </Button>
      {openModal && (
        <ModalAddUsername
          title={authUser?.username ? "Ubah" : "Tambahkan"}
          setOpenModal={setOpenModal}
          prevUsername={authUser?.username ? authUser.username : ''}
        />
      )}
    </div>
  );
};

export default UserInfo;
