import type { AccessTokenResponse } from "@/types";
import { publicApi } from "./client";

let refreshing: Promise<AccessTokenResponse > | null = null;

async function performRefresh(): Promise<AccessTokenResponse > {
  const { data } = await publicApi.post<AccessTokenResponse>("/api/auth/refresh");
  
  return data;
}

export function refreshOnce(): Promise<AccessTokenResponse > {
  refreshing ??= performRefresh().finally(() => {
    refreshing = null;
  });
  return refreshing;
}