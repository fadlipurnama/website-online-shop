import { useNavigate } from "react-router-dom";
import Button from "../../Elements/Buttons";
import { useSelector } from "react-redux";
import { LuUser2 } from "react-icons/lu";

const NavAuth = () => {
  const { authUser = null, loading = false } = useSelector(
    (state) => state.auth,
  );
  const navigate = useNavigate();

  console.log(loading);
  console.log(authUser);

  return (
    <>
      {loading && <div className="h-11 w-11 animate-pulse bg-slate-400"></div>}
      {!loading && authUser && (
        <div className={`hidden  items-center gap-5 lg:flex`}>
          <p
            className={`${loading && "animate-pulse bg-slate-600 text-slate-600"}`}
          >
            {authUser.firstName}
          </p>
          <LuUser2
            className={`h-11 w-11 ${loading && "animate-pulse bg-slate-600 text-slate-600"} rounded-full border border-black`}
          />
        </div>
      )}
      {!loading && !authUser && (
        <div className="hidden gap-2 lg:flex">
          <Button
            onClick={() => {
              navigate("/login");
            }}
            className="px-6 py-5"
            variant="btn-1"
          >
            LOGIN
          </Button>
          <Button
            onClick={() => {
              navigate("/register");
            }}
            className="px-6 py-5"
            variant="btn-2"
          >
            DAFTAR
          </Button>
        </div>
      )}
    </>
  );
};

export default NavAuth;
