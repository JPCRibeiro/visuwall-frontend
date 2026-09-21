import { loginRequest, logoutRequest, registerRequest } from "@/features/auth/api/requests";
import { refreshOnce } from "@/lib/api/refresh";
import { queryClient } from "@/lib/queryClient";
import { create } from "zustand";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

type AuthState = {
  accessToken: string | null;
  status: AuthStatus;

  bootstrap: () => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  setAccessToken: (accessToken: string) => void;
  logout: () => Promise<void>;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  status: "loading",

  bootstrap: async () => {
    if (get().status !== "loading") return;
    try {
      const { accessToken } = await refreshOnce();
      get().setAccessToken(accessToken);
    } catch {
      set({ status: "unauthenticated" });
    }
  },

  register: async (email, password, username) => {
    const { accessToken } = await registerRequest({email, password, username});
    get().setAccessToken(accessToken);
  },

  login: async (email, password) => {
    const { accessToken } = await loginRequest({email, password});
    get().setAccessToken(accessToken);
  },

  setAccessToken: (accessToken) => set({ accessToken, status: "authenticated" }),

  logout: async () => {
    try {
      await logoutRequest();
    } catch {}
    
    get().clearSession();
  },

  clearSession: () => {
    set({ accessToken: null, status: "unauthenticated" });
    queryClient.clear();
  },
}));