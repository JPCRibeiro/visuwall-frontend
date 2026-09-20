import type { WallpaperResponse } from "@/types";
import { SkeletonBar } from "../../../components/Skeleton";
import { cn } from "@/lib/utils";
import { Download, Eye, Loader2, Star, Tag } from "lucide-react";
import { categoryLabels } from "@/lib/constants/categories";
import { Button } from "@/components/Button";
import { useState } from "react";

function Value({
  loading,
  skeletonWidth,
  className,
  children,
}: {
  loading: boolean;
  skeletonWidth: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (loading) return <SkeletonBar className={cn("h-4", skeletonWidth)} />;
  return (
    <span className={cn("text-sm font-medium text-white", className)}>
      {children}
    </span>
  );
}

const ACCENT = "#03e3b8";

export function WallpaperAside({
  wallpaper,
  isLoading,
}: {
  wallpaper?: WallpaperResponse;
  isLoading: boolean;
}) {
  const [isDownloading, setIsDownloading] = useState(false);
  async function handleDownload(url: string, shortId: string) {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = objectUrl;
      const ext = blob.type.split("/")[1] ?? "jpg";
      a.download = `visuwall-${shortId}.${ext}`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(objectUrl);
    } catch (err) {
      console.error("Falha ao baixar:", err);
    } finally {
      setIsDownloading(false);
    }
  }
  return (
    <aside className="fixed left-0 top-16.25 w-80 h-[calc(100vh-4rem)] overflow-y-auto border-r border-zinc-900 bg-background shadow-[0_0_10px_rgba(0,0,0,0.4)]">
      <div className="flex flex-col gap-6 p-6">
        {wallpaper && (
          <Button
            onClick={() =>
              handleDownload(wallpaper.originalUrl, wallpaper.shortId)
            }
            disabled={isDownloading}
            className="items-center gap-2"
          >
            {isDownloading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Baixando...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Baixar
              </>
            )}
          </Button>
        )}
        <div className="flex flex-col gap-4 rounded-lg border border-white/10 bg-white/2 p-4">
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-sm text-zinc-400">
              <Eye className="h-4 w-4" style={{ color: ACCENT }} />
              Visualizações
            </span>
            <Value loading={isLoading} skeletonWidth="w-8">
              1
            </Value>
          </div>

          <div className="h-px bg-white/5" />

          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-sm text-zinc-400">
              <Download className="h-4 w-4" style={{ color: ACCENT }} />
              Downloads
            </span>
            <Value loading={isLoading} skeletonWidth="w-8">
              2
            </Value>
          </div>

          <div className="h-px bg-white/5" />

          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-sm text-zinc-400">
              <Star className="h-4 w-4" style={{ color: ACCENT }} />
              Favoritos
            </span>
            <Value loading={isLoading} skeletonWidth="w-8">
              3
            </Value>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-lg border border-white/10 bg-white/2 p-4">
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-sm text-zinc-400">
              Categoria
            </span>
            <Value
              loading={isLoading}
              skeletonWidth="w-20"
            >
              {wallpaper &&
                (categoryLabels[wallpaper.category] ?? wallpaper.category)}
            </Value>
          </div>

          <div className="h-px bg-white/5" />

          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-sm text-zinc-400">
              Resolução
            </span>
            <Value loading={isLoading} skeletonWidth="w-24">
              {wallpaper?.width} × {wallpaper?.height}
            </Value>
          </div>

          <div className="h-px bg-white/5" />

          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-sm text-zinc-400">
              Enviado em
            </span>
            <Value loading={isLoading} skeletonWidth="w-20">
              {wallpaper &&
                new Date(wallpaper.createdAt).toLocaleDateString("pt-BR")}
            </Value>
          </div>
        </div>

        <div>
          <span className="mb-2 flex items-center gap-2 text-sm text-zinc-400">
            <Tag className="h-4 w-4" style={{ color: ACCENT }} />
            Tags
          </span>
          {isLoading ? (
            <div className="flex flex-wrap gap-2">
              <SkeletonBar className="h-6 w-14" />
              <SkeletonBar className="h-6 w-20" />
              <SkeletonBar className="h-6 w-16" />
            </div>
          ) : wallpaper?.tags?.length ? (
            <div className="flex flex-wrap gap-2">
              {wallpaper.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-zinc-500">Sem tags</p>
          )}
        </div>

        <div className="mt-auto flex items-center gap-3 border-t border-white/10 pt-4">
          {isLoading ? (
            <SkeletonBar className="h-9 w-9 rounded-full" />
          ) : (
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold text-black"
              style={{
                background: `linear-gradient(135deg, ${ACCENT}, #3AEDE3)`,
              }}
            >
              JP
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-xs text-zinc-500">Enviado por</span>
            {isLoading ? (
              <SkeletonBar className="mt-1 h-4 w-32" />
            ) : (
              <span className="text-sm font-medium text-white">
                Usuário desconhecido
              </span>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
