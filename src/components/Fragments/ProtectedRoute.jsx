import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element }) => {
  const { authUser } = useSelector((state) => state.auth);

  return authUser ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
