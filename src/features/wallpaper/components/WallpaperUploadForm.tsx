import ImageDrop from "@/components/ImageDrop";
import Select from "@/components/Select";
import Label from "@/components/Label";
import { Loader2 } from "lucide-react";
import { useUploadWallpaper } from "../api/queries";
import { Controller, useForm } from "react-hook-form";
import {
  WallpaperUploadSchema,
  type WallpaperUploadFormType,
} from "../uploadSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/Button";
import { categories } from "@/lib/constants/categories";
import { TagsInput } from "@/components/TagsInput";

export default function WallpaperUploadForm() {
  const upload = useUploadWallpaper();

  const {
    control,
    handleSubmit,
    resetField,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<WallpaperUploadFormType>({
    resolver: zodResolver(WallpaperUploadSchema),
    defaultValues: { tags: [] },
  });

  const onSubmit = async (data: WallpaperUploadFormType) => {
    await upload.mutateAsync({
      file: data.file,
      category: data.category,
      tags: data.tags,
    });
    reset();
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
        <Controller
          control={control}
          name="tags"
          render={({ field }) => (
            <TagsInput value={field.value ?? []} onChange={field.onChange} />
          )}
        />
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
