import { api, publicApi } from "@/lib/api/client";
import type {
  AccessTokenResponse,
  LoginRequest,
  RegisterRequest,
  UserResponse,
} from "@/types";

export async function registerRequest({
  email,
  password,
  username,
}: RegisterRequest): Promise<AccessTokenResponse> {
  const { data } = await publicApi.post<AccessTokenResponse>(
    "/api/auth/register",
    {
      email,
      password,
      username,
    },
  );
  return data;
}

export async function loginRequest({
  email,
  password,
}: LoginRequest): Promise<AccessTokenResponse> {
  const { data } = await publicApi.post<AccessTokenResponse>(
    "/api/auth/login",
    {
      email,
      password,
    },
  );
  return data;
}

export async function logoutRequest(): Promise<void> {
  await publicApi.post("/api/auth/logout");
}

export async function meRequest(): Promise<UserResponse> {
  const { data } = await api.get<UserResponse>("/api/users/me");
  return data;
}