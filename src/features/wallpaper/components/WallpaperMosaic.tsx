import { useWallpapers } from "@/features/wallpaper/api/queries";
import type { WallpaperSummaryResponse } from "@/types";
import { MOSAIC_ROWS, MOSAIC_TOTAL } from "../constants";
import { WallpaperMosaicSkeleton } from "./WallpaperMosaicSkeleton";
import { useState } from "react";

export function WallpaperMosaic() {
  const { data, isLoading, isError } = useWallpapers();
  const [loadedCount, setLoadedCount] = useState(0);

  if (isLoading) return <WallpaperMosaicSkeleton />;
  if (isError) return <p>Erro ao carregar imagens</p>;

  const wallpapers = data || [];
  const items = wallpapers.slice(0, MOSAIC_TOTAL);
  const allLoaded = items.length > 0 && loadedCount >= items.length;

  const countOne = () => setLoadedCount((c) => c + 1);

  const rows: WallpaperSummaryResponse[][] = [];
  let cursor = 0;
  for (const count of MOSAIC_ROWS) {
    rows.push(items.slice(cursor, cursor + count));
    cursor += count;
  }

  return (
    <div className="hidden flex-col gap-2 md:flex">
      {rows.map((row, i) => (
        <div key={i} className="flex gap-2">
          {row.map((w) => (
            <article
              key={w.id}
              className="flex-1 aspect-16/10 overflow-hidden rounded-md bg-white/5"
            >
              <img
                src={w.thumbUrl}
                alt=""
                loading="eager"
                onLoad={countOne}
                onError={countOne}
                className={`h-full w-full object-cover transition-opacity duration-500 ${
                  allLoaded ? "opacity-100" : "opacity-0"
                }`}
              />
            </article>
          ))}
        </div>
      ))}
    </div>
  );
}