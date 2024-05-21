import HomePage from "./pages/home";
import ErrorPage from "./pages/404";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { asyncSetAuthUser, asyncUnsetAuthUser } from "./redux/authUser/action";
import AdminPage from "./pages/admin.jsx";
import FormAddCategory from "./components/Fragments/FormAddCategory";
import TabelProducts from "./components/Fragments/Admin/TabelProducts.jsx";
import DetailProductAdmin from "./components/Fragments/Admin/DetailProduct.jsx";

const App = () => {
  const {
    message,
    loading = false,
    authUser,
  } = useSelector((states) => states.auth);
  const dispatch = useDispatch();
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      dispatch(asyncSetAuthUser()).finally(() => setHasCheckedAuth(true));
    } else {
      setHasCheckedAuth(true);
    }
  }, [dispatch]);

  useEffect(() => {
    if (hasCheckedAuth && message === "Invalid token.") {
      dispatch(asyncUnsetAuthUser());
    }
  }, [dispatch, message, hasCheckedAuth]);

  const routes = [
    {
      path: "/",
      element: <HomePage />,
      errorElement: <ErrorPage authUser={authUser} />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ];

  if (authUser?.isAdmin) {
    routes.push({
      path: "/admin",
      element: <AdminPage />,
      children: [
        {
          path: "tabel-products",
          element: <TabelProducts />,
        },
        {
          path: "tabel-products/:productId",
          element: <DetailProductAdmin />,
        },
        {
          path: "tabel-categories",
          element: <FormAddCategory />,
        },
      ],
    });
  }

  const router = createBrowserRouter(routes);

  if (loading || !hasCheckedAuth) {
    return null; // Bisa juga menggunakan spinner atau loading indicator di sini
  }

  return <RouterProvider router={router} />;
};

export default App;
