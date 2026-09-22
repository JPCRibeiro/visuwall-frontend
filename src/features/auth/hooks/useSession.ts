import { useAuthStore } from "@/store/auth";

export function useIsSignedIn() {
  return useAuthStore((s) => s.status === "authenticated");
}

export function useAuthStatus() {
  return useAuthStore((s) => s.status);
}