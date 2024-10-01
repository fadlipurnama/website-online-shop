import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  // const navigate = useNavigate();
  const error = useRouteError();
  // if (!authUser) {
  //   window.location.href = "/login";
  // }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <p className="my-5 text-xl"></p>
      <h1 className="text-9xl font-bold">404</h1>
      <p className="text-2xl">Page {error.statusText || error.nessage}</p>
    </div>
  );
};

export default ErrorPage;
