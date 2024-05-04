import HomePage from "./pages/home";
import ErrorPage from "./pages/404";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import { useDispatch, useSelector } from "react-redux";
// import useGetDataUser from "./hooks/useAuth/dataUser";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { asyncSetAuthUser } from "./redux/authUser/action";

const App = () => {
  const { message } = useSelector((states) => states.auth);
  const dispatch = useDispatch();

  console.log(message);

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      dispatch(asyncSetAuthUser());
    }

    // if (!accessToken) {
    // }
    // if (message === "Failed to fetch") {
    //   Cookies.set("accessToken", "");
    //   dispatch(asyncUnsetAuthUser());
    // }
    console.log(accessToken);
  }, [dispatch]);

  return (
    <>
      <main>
        <RouterProvider
          router={createBrowserRouter([
            {
              path: "/",
              element: <HomePage />,
              errorElement: <ErrorPage />,
            },
            {
              path: "/login",
              element: <LoginPage />,
            },
            {
              path: "/register",
              element: <RegisterPage />,
            },
          ])}
        />
      </main>
    </>
  );
};

export default App;
