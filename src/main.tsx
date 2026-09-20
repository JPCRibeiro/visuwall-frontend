import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import Wallpapers from "./pages/Wallpapers.tsx";
import Upload from "./pages/(protected)/Upload.tsx";
import "@fontsource/fascinate";
import "@fontsource/geist/400.css";
import "@fontsource/geist/500.css";
import "@fontsource/geist/600.css";
import "@fontsource/geist/700.css";
import WallpaperDetailPage from "./pages/WallpaperDetail.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "upload", Component: Upload },
      {
        path: "wallpapers",
        children: [
          { index: true, Component: Wallpapers },
          { path: ":shortId", Component: WallpaperDetailPage },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
