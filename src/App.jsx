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
import AdminPage from "./pages/admin/admin";
import FormAddProduct from "./components/Fragments/FormAddProduct";
import FormAddCategory from "./components/Fragments/FormAddCategory";
import TabelProducts from "./components/Fragments/TabelProducts";

const App = () => {
  const { message, loading, authUser } = useSelector((states) => states.auth);
  const dispatch = useDispatch();

  // console.log("message: ", message);
  // console.log(authUser);

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
    // console.log(accessToken);
  }, [dispatch]);

  const router = createBrowserRouter([
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
    {
      path: "/admin",
      element: <AdminPage />,
      children: [
        {
          path: "add-product",
          element: (
            <>
              <FormAddProduct />
              <TabelProducts />
            </>
          ),
        },
        {
          path: "add-category",
          element: <FormAddCategory />,
        },
      ],
    },
  ]);

  if (loading) {
    return null;
  }

  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
};

export default App;
