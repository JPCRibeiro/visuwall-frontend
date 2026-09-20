import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getWallpaper, getWallpapers, uploadWallpaper } from "./requests";
import type { UploadWallpaperRequest } from "@/types";

export const wallpaperKeys = {
  all: ["wallpapers"] as const,
  lists: () => [...wallpaperKeys.all, "list"] as const,
  list: () => [...wallpaperKeys.lists()] as const,
  details: () => [...wallpaperKeys.all, "detail"] as const,
  detail: (shortId: string) => [...wallpaperKeys.details(), shortId] as const,
};

export function useUploadWallpaper() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (input: UploadWallpaperRequest) => uploadWallpaper(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: wallpaperKeys.lists() });
    },
  });
}

export function useWallpapers() {
  return useQuery({
    queryKey: wallpaperKeys.list(),
    queryFn: () => getWallpapers(),
    placeholderData: (previousData) => previousData, 
  });
}

export function useWallpaper(shortId: string | undefined) {
  return useQuery({
    queryKey: wallpaperKeys.detail(shortId ?? ""),
    queryFn: () => getWallpaper({ shortId: shortId! }),
    enabled: !!shortId,
  });
}