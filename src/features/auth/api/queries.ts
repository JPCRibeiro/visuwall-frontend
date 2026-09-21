import { useAuthStore } from "@/store/auth";
import type { LoginRequest, RegisterRequest } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useLogin() {
  const login = useAuthStore((s) => s.login);

  return useMutation({
    mutationFn: (req: LoginRequest) => login(req.email, req.password),
  });
}

export function useRegister() {
  const register = useAuthStore((s) => s.register);

  return useMutation({
    mutationFn: (req: RegisterRequest) => register(req.email, req.password, req.username),
  });
}

export function useLogout() {
  const logout = useAuthStore((s) => s.logout);

  return useMutation({
    mutationFn: () => logout(),
  });
}