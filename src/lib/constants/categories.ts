import type { Category } from "@/types";

export const categoryLabels: Record<Category, string> = {
  GENERAL: "Geral",
  ANIME: "Anime",
  PERSON: "Pessoas",
  NATURE: "Natureza",
  ABSTRACT: "Abstrato",
  SPACE: "Espaço",
  TECHNOLOGY: "Tecnologia",
  FOOD: "Comida",
  VEHICLE: "Veículos",
  GAME: "Jogo",
  ANIMAL: "Animais",
};

export const categories = (Object.keys(categoryLabels) as Category[]).map(
  (value) => ({ value, label: categoryLabels[value] }),
);

export const categoryValues = Object.keys(categoryLabels) as [Category, ...Category[]];