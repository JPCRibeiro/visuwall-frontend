export type Category =
  | "GENERAL"
  | "ANIME"
  | "PERSON"
  | "NATURE"
  | "ABSTRACT"
  | "SPACE"
  | "TECHNOLOGY"
  | "FOOD"
  | "VEHICLE"
  | "GAME"
  | "ANIMAL";

export type UploadWallpaperRequest = {
  file: File;
  category: Category;
  tags?: string[];
};

export type WallpaperResponse = {
  id: string;
  shortId: string;
  originalUrl: string;
  thumbUrl: string;
  category: Category;
  tags: string[];
  width: number;
  height: number;
  userId: string;
  authorName: string;
  createdAt: string;
};

export type WallpaperSummaryResponse = {
  id: string;
  shortId: string;
  thumbUrl: string;
  width: number;
  height: number;
};