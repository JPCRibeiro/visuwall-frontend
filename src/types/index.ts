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
  shortId: string;
  originalUrl: string;
  thumbUrl: string;
  category: Category;
  tags: string[];
  width: number;
  height: number;
  authorName: string;
  createdAt: string;
};

export type WallpaperSummaryResponse = {
  shortId: string;
  thumbUrl: string;
  width: number;
  height: number;
};

export type AccessTokenResponse = {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
}

export type LoginRequest = {
  email: string;
  password: string;
}