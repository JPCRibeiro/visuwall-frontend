
import { Navigate, Outlet } from "react-router";
import { useIsSignedIn } from "../hooks/useSession";

export default function RequireGuest() {
  const isSignedIn = useIsSignedIn();
  return isSignedIn ? <Navigate to="/" replace /> : <Outlet />;
}