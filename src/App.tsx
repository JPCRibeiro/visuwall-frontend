import { Outlet, ScrollRestoration } from "react-router";
import Header from "./components/Header";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useAuthStatus } from "./features/auth/hooks/useSession";
import { useAuthStore } from "./store/auth";

export default function App() {
  const bootstrap = useAuthStore((s) => s.bootstrap);
  const status = useAuthStatus();

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  if (status === "loading") {
    return (
      <main>
        <Loader2 className="animate-spin" size={24}/>
      </main>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-full">
        <Outlet />
      </main>
      <ScrollRestoration />
    </>
  );
}
