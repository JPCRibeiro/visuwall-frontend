import { z } from "zod";
import { categoryValues } from "@/lib/constants/categories";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const WallpaperUploadSchema = z.object({
  file: z
    .custom<File>((val) => val instanceof File, "O upload de um arquivo é obrigatório")
    .refine((file) => file.size <= MAX_FILE_SIZE, "O arquivo deve ter no máximo 10MB")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Formato inválido. Use JPG, PNG ou JPEG",
    ),
  category: z.enum(categoryValues, { message: "Selecione uma categoria válida" }),
  tags: z.array(z.string()).optional(),
});

export type WallpaperUploadFormType = z.infer<typeof WallpaperUploadSchema>;