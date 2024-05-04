import { Link } from "react-router-dom";
import logo from "../../assets/logo-ahe.png";
import vektor from "../../assets/vector-banner-ahe.png";

const AuthLayout = ({ children, title, type }) => {
  return (
    <div className="flex min-h-screen overflow-auto">
      <div className="relative flex min-h-full w-full flex-col items-center justify-center bg-white">
        <span className="absolute left-6 top-6 cursor-pointer text-2xl font-bold text-primaryColor xl:left-10 xl:top-10">
          Anugrah Hadi Electric
        </span>
        <span className="absolute bottom-4 left-4 font-light">
          Copyright © Anugrah Hadi Electric 2024, All Right Reserved
        </span>
        <div className="w-full max-w-xl rounded-lg px-6 py-12">
          <h1 className="mb-4 text-3xl font-bold text-primaryColor">{title}</h1>
          <p className="mb-2 text-lg text-slate-600">Selamat Datang</p>
          {children}
          <p className="mt-5 text-center text-sm">
            {type === "login"
              ? "Belum memiliki akun? "
              : "Sudah memiliki akun? "}
            {type === "login" && (
              <Link to="/register" className="font-bold text-secondaryColor">
                Daftar
              </Link>
            )}
            {type === "register" && (
              <Link to="/login" className="font-bold text-secondaryColor">
                Masuk
              </Link>
            )}
          </p>
        </div>
      </div>
      <div className="relative hidden max-h-full w-full flex-col items-end justify-start bg-gradient-to-r from-primaryColor to-secondaryColor py-32 xl:flex">
        <img
          src={logo}
          alt="logo-ahe"
          className="absolute right-2 top-2 h-20"
        />
        <img src={vektor} alt="gambar-vektor" className="h-auto max-h-96" />
        <div className="absolute bottom-[30%] left-20 flex w-3/5 flex-col gap-3">
          <p className="text-3xl font-semibold text-white/70">
            Temukan Produk yang anda cari bersama kami
          </p>
          <p className="text-lg font-semibold text-white/70">
            Memberikan pelayanan terbaik, Kualitas terbaik dan tentu dengan
            harga terbaik.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
