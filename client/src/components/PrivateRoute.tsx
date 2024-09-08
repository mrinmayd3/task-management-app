import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, user } = useAuth();

  return token && user ? children : <Navigate to={"/login"} />;
}
