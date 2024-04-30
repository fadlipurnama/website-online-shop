import { Link } from "react-router-dom";

const AuthLayout = ({ children, title, type }) => {
  return (
    <div className="flex min-h-screen items-center justify-center gap-4 overflow-x-auto">
      <div className="w-full max-w-md rounded-lg border bg-white px-6 py-10">
        <h1 className="mb-4 text-3xl font-bold text-primaryColor">{title}</h1>
        <p className="mb-2 text-lg text-slate-600">Selamat Datang</p>
        {children}
        <p className="mt-5 text-center text-sm">
          {type === "login" ? "Belum memiliki akun? " : "Sudah memiliki akun? "}
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
  );
};

export default AuthLayout;
