import { useIsSignedIn } from "@/lib/api/useSession";
import { Navigate, Outlet } from "react-router";

export function RequireAuth() {
  const isSignedIn = useIsSignedIn();
  return isSignedIn ? <Outlet /> : <Navigate to="/login" replace />;
}

export function RequireGuest() {
  const isSignedIn = useIsSignedIn();
  return isSignedIn ? <Navigate to="/" replace /> : <Outlet />;
}