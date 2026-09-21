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
import LoginPage from "./pages/(auth)/Login.tsx";
import RegisterPage from "./pages/(auth)/Register.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient.ts";
import { RequireAuth, RequireGuest } from "./pages/(protected)/ProtectedRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      {
        path: "wallpapers",
        children: [
          { index: true, Component: Wallpapers },
          { path: ":shortId", Component: WallpaperDetailPage },
        ],
      },
      {
        Component: RequireGuest,
        children: [
          { path: "login", Component: LoginPage },
          { path: "cadastro", Component: RegisterPage },
        ],
      },
      {
        Component: RequireAuth,
        children: [
          { path: "upload", Component: Upload },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);