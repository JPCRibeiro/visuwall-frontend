import { useAuthStore } from "@/store/auth";
import type { AxiosError } from "axios";
import { api, toApiError, type RetriableConfig } from "./client";
import { refreshOnce } from "./refresh";

export function registerAuthInterceptors() {
  api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const config = error.config as RetriableConfig | undefined;

      if (error.response?.status !== 401 || !config || config._retried) {
        return Promise.reject(toApiError(error));
      }

      config._retried = true;

      try {
        const { accessToken } = await refreshOnce();
        useAuthStore.getState().setAccessToken(accessToken);
        config.headers.Authorization = `Bearer ${accessToken}`;
        return api.request(config);
      } catch {
        useAuthStore.getState().clearSession();
        return Promise.reject(toApiError(error));
      }
    },
  );
}