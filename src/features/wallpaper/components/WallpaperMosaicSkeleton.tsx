import { MOSAIC_ROWS, MOSAIC_TOTAL } from "../constants";

export function WallpaperMosaicSkeleton() {
  return (
    <>
      <div className="grid grid-cols-2 gap-2 md:hidden">
        {Array.from({ length: MOSAIC_TOTAL }).map((_, i) => (
          <div
            key={i}
            className="aspect-16/10 animate-pulse rounded-md bg-white/5"
          />
        ))}
      </div>

      <div className="hidden flex-col gap-2 md:flex">
        {MOSAIC_ROWS.map((count, i) => (
          <div key={i} className="flex gap-2">
            {Array.from({ length: count }).map((_, j) => (
              <div
                key={j}
                className="flex-1 aspect-16/10 animate-pulse rounded-md bg-white/5"
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}