import WallpaperUploadForm from "@/features/wallpaper/components/WallpaperUploadForm";
import { useDocumentTitle } from "@/lib/hooks/useDocumentTitle";

export default function UploadPage() {
  useDocumentTitle("Upload Wallpaper | VisuWall");

  return (
    <div className="mt-16 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-2">Upload Wallpaper</h1>
      <p className="text-zinc-400 mb-5">
        Compartilhe seus incríveis papéis de parede com a comunidade
      </p>
      <WallpaperUploadForm />
    </div>
  );
}
