import { useRouteError } from "react-router-dom";

const ErrorPage = ({ authUser }) => {
  // const navigate = useNavigate();
  const error = useRouteError();
  if (!authUser) {
    window.location.href = "/login";
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Oops!</h1>
      <p className="my-5 text-xl">Sorry, an unexpected error has occured</p>
      <p className="text-lg">{error.statusText || error.nessage}</p>
    </div>
  );
};

export default ErrorPage;
