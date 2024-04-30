import { Link } from "react-router-dom";

const AuthLayout = ({ children, title, type }) => {
  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="w-full max-w-sm py-10 rounded-lg px-6 bg-white border">
        <h1 className="text-3xl font-bold mb-4 text-primaryColor">{title}</h1>
        {/* <p className="fint-medium text-slate-500 mb-8">
          {type === "login"
            ? "Selamat datang, silakan masukkan akun Anda"
            : "Selamat datang, silakan daftarkan akun"}
        </p> */}
        {children}
        <p className="text-sm mt-5 text-center">
          {type === "login" ? "Belum memiliki akun? " : "Sudah memiliki akun? "}
          {type === "login" && (
            <Link to="/register" className="font-bold text-secondaryColor">
              Register
            </Link>
          )}
          {type === "register" && (
            <Link to="/login" className="font-bold text-secondaryColor">
              Login
            </Link>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
