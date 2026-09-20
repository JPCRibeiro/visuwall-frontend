import { ErrorState } from "@/components/ErrorState";
import { useWallpapers } from "../api/queries";
import { WallpaperGallerySkeleton } from "./WallpaperGallerySkeleton";

export function WallpaperGallery() {
  const { data, isLoading, isError, refetch } = useWallpapers();

  if (isLoading) return <WallpaperGallerySkeleton />; 
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  const wallpapers = data || [];

  return (
    <div className="columns-2 md:columns-3 xl:columns-4 gap-3 px-7">
      {wallpapers.map((wallpaper) => (
        <img
          key={wallpaper.id}
          src={wallpaper.thumbUrl}
          alt=""
          loading="lazy"
          className="mb-3 w-full rounded-md break-inside-avoid transition-transform duration-300"
        />
      ))}
    </div>
  );
}
