import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ childern }) {
  const accessToken = useSelector((state) => state.auth.accessToken);

  return accessToken ? childern : <Navigate to="/home" />;
}
