import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadWallpaper } from "./requests";
import type { UploadWallpaperRequest } from "@/types";

export const wallpaperKeys = {
  all: ["wallpapers"] as const,
  lists: () => [...wallpaperKeys.all, "list"] as const,
  list: () => [...wallpaperKeys.lists()] as const,
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