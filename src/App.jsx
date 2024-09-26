import HomePage from "./pages/home";
import ErrorPage from "./pages/404";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { asyncSetAuthUser, asyncUnsetAuthUser } from "./redux/authUser/action";
import ProductCategoriesPage from "./pages/productCategories.jsx";
import LoadingPage from "./pages/loading.jsx";
import ProductPromotionPage from "./pages/productPromotion.jsx";
import DetailProfilePage from "./pages/detailProfile.jsx";
import DetailProductPage from "./pages/detailProduct.jsx";
import UserInfo from "./components/Fragments/UserInfo.jsx";
import UserCart from "./components/Fragments/UserCart.jsx";
import AddAddress from "./components/Fragments/AddAddress.jsx";
import CartPage from "./pages/cart.jsx";
import WishlistItemList from "./components/Fragments/WishlistItemList.jsx";
import CheckoutPage from "./pages/checkout.jsx";
import DetailTransactionPage from "./pages/detailTransaction.jsx";
import TransactionList from "./components/Fragments/TransactionList.jsx";
import ProtectedRoute from "./components/Fragments/ProtectedRoute.jsx";
import OrderList from "./components/Fragments/OrderListFragment.jsx";
import DetailOrderPage from "./pages/detailOrder.jsx";

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
      dispatch(asyncSetAuthUser()).finally(() => setHasCheckedAuth(true)); // Set checked to true after dispatch completes
    } else {
      setHasCheckedAuth(true); // No token, just finish checking
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
      path: "/transaction",
      element: <ProtectedRoute element={<DetailTransactionPage />} />,
    },
    {
      path: "/cart/checkout",
      // Menggunakan ProtectedRoute
      element: <ProtectedRoute element={<CheckoutPage />} />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/order/:orderId",
      element: <DetailOrderPage />,
    },
    {
      path: "/cart/cart-list",
      element: <CartPage />,
    },
    {
      path: "/user-profile/:userId",
      element: <ProtectedRoute element={<DetailProfilePage />} />,

      children: [
        {
          path: "",
          element: <UserInfo />,
        },
        {
          path: "keranjang-belanja",
          element: <UserCart />,
        },
        {
          path: "alamat",
          element: <AddAddress />,
        },
        {
          path: "wishlist",
          element: <WishlistItemList />,
        },
        {
          path: "daftar-transaksi",
          element: <TransactionList />,
        },
        {
          path: "daftar-pesanan",
          element: <OrderList />,
        },
      ],
    },
    {
      path: "/promo/:promotionName",
      element: <ProductPromotionPage />,
    },
    {
      path: "/products/:categories",
      element: <ProductCategoriesPage />,
    },
    {
      path: "/promo/:promotionName//:productId",
      element: <DetailProductPage />,
    },
    {
      path: "/products/:categories/:productId",
      element: <DetailProductPage />,
    },
  ];

  const router = createBrowserRouter(routes);

  // Return loading page if loading is true or auth check is not completed
  if (loading || !hasCheckedAuth) {
    return <LoadingPage />; // Display loading indicator
  }

  return <RouterProvider router={router} />;
};

export default App;
