import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getWallpapers, uploadWallpaper } from "./requests";
import type { UploadWallpaperRequest } from "@/types";

export const wallpaperKeys = {
  all: ["wallpapers"] as const,
  lists: () => [...wallpaperKeys.all, "list"] as const,
  list: () => [...wallpaperKeys.lists()] as const,
  details: () => [...wallpaperKeys.all, "detail"] as const,
  detail: (id: string) => [...wallpaperKeys.details(), id] as const,
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