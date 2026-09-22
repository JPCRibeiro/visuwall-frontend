import { api, publicApi } from "@/lib/api/client";
import type {
  UploadWallpaperRequest,
  WallpaperResponse,
  WallpaperSummaryResponse,
} from "@/types";

export async function uploadWallpaper({ file, category, tags }: UploadWallpaperRequest): Promise<WallpaperResponse> {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("category", category);

  if (tags && tags.length > 0) {
    formData.append("tags", tags.join(","));
  }

  const { data } = await api.post<WallpaperResponse>("/api/wallpapers", formData);

  return data;
}

export async function getWallpapers(): Promise<WallpaperSummaryResponse[]> {
  const { data } = await publicApi.get<WallpaperSummaryResponse[]>("/api/wallpapers");

  return data;
}

export async function getWallpaper({ shortId }: { shortId: string;}): Promise<WallpaperResponse> {
  const { data } = await publicApi.get<WallpaperResponse>(`/api/wallpapers/${shortId}`);

  return data;
}
