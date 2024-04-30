import HomePage from "./pages/home";
import ErrorPage from "./pages/404";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import { useSelector } from "react-redux";
import useGetDataUser from "./hooks/useAuth/dataUser";
import AdminPage from "./pages/admin";

const App = () => {
  const { authUser, loading, error } = useSelector((state) => state.auth);
  useGetDataUser();

  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <HomePage />,
  //     errorElement: <ErrorPage />,
  //   },
  //   {
  //     path: "/login",
  //     element: <LoginPage />,
  //   },
  //   {
  //     path: "/register",
  //     element: <RegisterPage />,
  //   },
  // ]);

  if (loading) {
    return <>Loading ...</>;
  }

  return (
    <>
      <main>
        <RouterProvider
          router={createBrowserRouter([
            {
              path: "/",
              element:
                !loading && authUser && authUser.isAdmin ? (
                  <AdminPage />
                ) : (
                  <HomePage />
                ),
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
