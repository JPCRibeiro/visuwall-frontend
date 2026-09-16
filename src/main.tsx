import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import Wallpapers from "./pages/Wallpapers.tsx";
import Favorites from "./pages/(protected)/Favorites.tsx";
import Upload from "./pages/(protected)/Upload.tsx";
import Register from "./pages/(auth)/Register.tsx";
import Login from "./pages/(auth)/Login.tsx";
import "@fontsource/fascinate";
import '@fontsource/geist/400.css';
import '@fontsource/geist/600.css';
import '@fontsource/geist/700.css';

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "wallpapers", Component: Wallpapers },
      { path: "favoritos", Component: Favorites },
      { path: "upload", Component: Upload },
      { path: "register", Component: Register },
      { path: "login", Component: Login },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
