import { Check, ImageIcon, UploadIcon, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { cn } from "../../../lib/utils";

type ImageDropzoneProps = {
  file: File | null;
  onFileSelect: (file: File) => void;
  onClear: () => void;
};

export default function ImageDrop({ file, onFileSelect, onClear }: ImageDropzoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const processFile = useCallback((selected: File) => {
    if (!selected.type.startsWith("image/")) return;
    const url = URL.createObjectURL(selected);

    setPreviewUrl(url);
    onFileSelect(selected);
  }, [onFileSelect],
  );

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      const dropped = e.dataTransfer.files?.[0];
      if (dropped) processFile(dropped);
    },
    [processFile],
  );

  const clear = () => {
    setPreviewUrl(null);
    onClear();
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={cn(
        "relative border-2 border-dashed rounded-2xl transition-all duration-300",
        dragActive ? "border-cyan-500 bg-cyan-500/10" : "border-zinc-800 hover:border-zinc-700",
        previewUrl ? "p-4" : "p-12",
      )}
    >
      {previewUrl && file ? (
        <div className="relative rounded-xl flex flex-col w-fit mx-auto">
          <img src={previewUrl} alt="Preview" className="w-full h-auto rounded-xl max-h-100 mx-auto caret-transparent select-none" />
          <button type="button" onClick={clear} className="absolute top-2 cursor-pointer right-2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80">
            <X className="w-4 h-4" />
          </button>
          <div className="mt-4 flex items-center justify-center gap-2 text-zinc-400 text-sm">
            <Check className="w-4 h-4 text-green-400" />
            {file.name} - {(file.size / (1024 * 1024)).toFixed(2)} MB
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mx-auto mb-4">
            <ImageIcon className="w-8 h-8 text-zinc-600" />
          </div>
          <h3 className="text-white font-medium mb-2">Arraste seu wallpaper aqui</h3>
          <p className="text-zinc-500 text-sm mb-4">Suporta JPG, PNG e JPEG</p>
          <label className="cursor-pointer">
            <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) processFile(f); }} className="hidden" />
            <span className="inline-flex items-center px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors">
              <UploadIcon className="w-4 h-4 mr-2" />
              Upload de um arquivo
            </span>
          </label>
        </div>
      )}
    </div>
  );
}