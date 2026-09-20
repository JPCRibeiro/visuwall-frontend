const SKELETON_HEIGHTS = [
  "h-48", "h-72", "h-56", "h-80", "h-52", "h-64",
  "h-60", "h-72", "h-48", "h-64", "h-80", "h-56",
];

export function WallpaperGallerySkeleton() {
  return (
    <div className="columns-2 md:columns-3 xl:columns-4 gap-3 px-7">
      {SKELETON_HEIGHTS.map((h, i) => (
        <div
          key={i}
          className={`mb-3 w-full ${h} animate-pulse rounded-md bg-white/5 break-inside-avoid`}
        />
      ))}
    </div>
  );
}