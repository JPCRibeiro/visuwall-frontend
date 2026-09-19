import { publicApi } from "@/lib/api/client";
import type { UploadWallpaperRequest, WallpaperResponse } from "@/types";

export async function uploadWallpaper({ file, category, tags }: UploadWallpaperRequest): Promise<WallpaperResponse> {
  const formData = new FormData();
  
  formData.append('file', file);
  formData.append('category', category);
  
  if (tags && tags.length > 0) {
    formData.append('tags', tags.join(','));
  }

  const { data } = await publicApi.post<WallpaperResponse>('/api/wallpapers', formData);
  
  return data;
}