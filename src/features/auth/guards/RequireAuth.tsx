
import { Navigate, Outlet } from "react-router";
import { useIsSignedIn } from "../hooks/useSession";

export default function RequireAuth() {
  const isSignedIn = useIsSignedIn();
  return isSignedIn ? <Outlet /> : <Navigate to="/login" replace />;
}
