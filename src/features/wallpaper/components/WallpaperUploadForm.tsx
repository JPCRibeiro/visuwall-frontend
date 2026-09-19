import { useState } from "react";
import ImageDrop from "@/components/ImageDrop";
import Select from "@/components/Select";
import Label from "@/components/Label";
import InputField from "@/components/InputField";
import { Loader2, Plus, X } from "lucide-react";
import { useUploadWallpaper } from "../api/queries";
import { Controller, useForm } from "react-hook-form";
import {
  WallpaperUploadSchema,
  type WallpaperUploadFormType,
} from "../uploadSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/Button";
import { categories } from "@/lib/constants/categories";
import { Badge } from "@/components/Badge";

export default function WallpaperUploadForm() {
  const upload = useUploadWallpaper();
  const [tagInput, setTagInput] = useState("");

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    resetField,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<WallpaperUploadFormType>({
    resolver: zodResolver(WallpaperUploadSchema),
    defaultValues: { tags: [] },
  });

  const tags = watch("tags") ?? [];

  const addTag = () => {
    const value = tagInput.trim().toLowerCase();
    if (!value || tags.includes(value)) return;
    setValue("tags", [...tags, value], { shouldValidate: true });
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setValue(
      "tags",
      tags.filter((t) => t !== tag),
      { shouldValidate: true },
    );
  };

  const onSubmit = async (data: WallpaperUploadFormType) => {
    await upload.mutateAsync({
      file: data.file,
      category: data.category,
      tags: data.tags,
    });
    reset();
    setTagInput("");
  };

  const serverError =
    upload.error &&
    ((upload.error as any).status === 409
      ? "Essa imagem já foi enviada."
      : "Algo deu errado no envio. Tente novamente.");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      {serverError && (
        <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-md text-center">
          {serverError}
        </div>
      )}
      <div>
        <Controller
          control={control}
          name="file"
          render={({ field }) => (
            <ImageDrop
              file={field.value ?? null}
              onFileSelect={(f) => field.onChange(f)}
              onClear={() => resetField("file")}
            />
          )}
        />
        {errors.file && (
          <p className="mt-2 text-sm text-red-400">{errors.file.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label label="Categoria" />
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <Select
              options={categories}
              value={field.value}
              onValueChange={field.onChange}
              placeholder="Selecione uma categoria"
            />
          )}
        />
        {errors.category && (
          <p className="text-sm text-red-400">{errors.category.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label label="Tags (Opcional)" />
        <div className="flex gap-2">
          <div className="flex-1">
            <InputField
              placeholder="Adicionar tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag();
                }
              }}
            />
          </div>
          <button
            type="button"
            onClick={addTag}
            className="h-12 px-4 bg-zinc-800/50 hover:bg-zinc-700 rounded-md border border-zinc-700/50"
          >
            <Plus className="w-4 h-4" color="white" />
          </button>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {tags.map((tag) => (
              <Badge
                key={tag}
                className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700 cursor-pointer px-3 py-1"
                onClick={() => removeTag(tag)}
              >
                {tag}
                <X className="w-3 h-3 ml-2" strokeWidth={3} />
              </Badge>
            ))}
          </div>
        )}
        {errors.tags && (
          <p className="text-sm text-red-400">{errors.tags.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="animate-spin" /> : "Entrar"}
      </Button>
    </form>
  );
}
