import { ErrorState } from "@/components/ErrorState";
import { useWallpaper } from "@/features/wallpaper/api/queries";
import { WallpaperAside } from "@/features/wallpaper/components/WallpaperAside";
import { SkeletonBar } from "@/components/Skeleton";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useParams } from "react-router";

export default function WallpaperDetailPage() {
  const { shortId } = useParams();
  const {
    data: wallpaper,
    isLoading,
    isError,
    refetch,
  } = useWallpaper(shortId);
  const [imgLoaded, setImgLoaded] = useState(false);

  if (isError) return <ErrorState onRetry={() => refetch()} />;
  if (!isLoading && !wallpaper) return <div>Wallpaper não encontrado</div>;

  return (
    <div className="pt-16.25 flex flex-col min-h-full">
      <WallpaperAside wallpaper={wallpaper} isLoading={isLoading} />

      <div className="relative ml-80 flex h-[calc(100vh-65px)] items-center justify-center p-8">
        {wallpaper && (
          <div
            className="relative max-h-full max-w-full overflow-hidden rounded-lg"
            style={{ aspectRatio: `${wallpaper.width} / ${wallpaper.height}` }}
          >
            {!imgLoaded && (
              <SkeletonBar className="absolute inset-0 rounded-lg" />
            )}
            <img
              src={wallpaper.originalUrl}
              crossOrigin="anonymous"
              alt={`Wallpaper ${wallpaper.category}`}
              loading="eager"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgLoaded(true)}
              className={cn(
                "h-full w-full object-cover transition-opacity duration-500",
                imgLoaded ? "opacity-100" : "opacity-0",
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
}
