import { ImageOff, RotateCw } from "lucide-react";

type Props = {
  title?: string;
  description?: string;
  onRetry?: () => void;
};

export function ErrorState({
  title = "Não foi possível carregar",
  description = "Algo deu errado ao buscar as imagens. Tente novamente.",
  onRetry,
}: Props) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-6 text-center">
      <ImageOff className="h-10 w-10 text-white" strokeWidth={1.5} />
      <div className="space-y-1">
        <p className="text-base font-medium text-white">{title}</p>
        <p className="max-w-sm text-sm text-white/50">{description}</p>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="cursor-pointer mt-2 inline-flex items-center gap-2 rounded-md border border-white/15 px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          <RotateCw className="h-4 w-4" />
          Tentar novamente
        </button>
      )}
    </div>
  );
}
