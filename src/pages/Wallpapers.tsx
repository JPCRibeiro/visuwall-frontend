import { Images } from "lucide-react";
import PageTitle from "@/components/PageTitle";
import { WallpaperGallery } from "@/features/wallpaper/components/WallpaperGallery";
import { useDocumentTitle } from "@/lib/hooks/useDocumentTitle";

export default function WallpapersPage() {
  useDocumentTitle("Wallpapers | VisuWall");

  return (
    <div className="gap-4 flex flex-col pb-8 mt-16">
      <PageTitle
        Icon={Images}
        title="Wallpapers"
        description="Todos os wallpapers enviados pela comunidade"
      />
      <WallpaperGallery/>
    </div>
  );
}
