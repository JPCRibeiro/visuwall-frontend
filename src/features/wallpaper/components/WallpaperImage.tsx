import { useState } from "react";

type Props = {
  src: string;
  className?: string;
};

export function WallpaperImage({ src, className }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      onLoad={() => setLoaded(true)}
      className={`${className ?? ""} transition-opacity duration-500 ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}