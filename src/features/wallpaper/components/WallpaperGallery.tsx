import { ErrorState } from "@/components/ErrorState";
import { useWallpapers } from "../api/queries";
import { WallpaperGallerySkeleton } from "./WallpaperGallerySkeleton";
import { Link } from "react-router";

export function WallpaperGallery() {
  const { data, isLoading, isError, refetch } = useWallpapers();

  if (isLoading) return <WallpaperGallerySkeleton />;
  if (isError) return <ErrorState onRetry={() => refetch()} />;

  const wallpapers = data || [];

  return (
    <div className="columns-2 md:columns-3 xl:columns-4 gap-3 px-7">
      {wallpapers.map((wallpaper) => (
        <Link
          key={wallpaper.id}
          to={`/wallpapers/${wallpaper.shortId}`}
          className="mb-3 block break-inside-avoid"
        >
          <img
            key={wallpaper.id}
            src={wallpaper.thumbUrl}
            alt=""
            loading="lazy"
            className="w-full rounded-md transition-transform duration-300"
          />
        </Link>
      ))}
    </div>
  );
}
