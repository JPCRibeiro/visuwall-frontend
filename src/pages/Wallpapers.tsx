import { Images } from "lucide-react";
import PageTitle from "@/components/PageTitle";
import { WallpaperGallery } from "@/features/wallpaper/components/WallpaperGallery";

export default function Wallpapers() {
  return (
    <div className="gap-4 flex flex-col pb-8">
      <PageTitle
        Icon={Images}
        title="Wallpapers"
        description="Todos os wallpapers enviados pela comunidade"
      />
      <WallpaperGallery/>
    </div>
  );
}
