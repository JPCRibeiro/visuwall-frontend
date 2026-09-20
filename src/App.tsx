import { Outlet } from "react-router";
import Header from "./components/Header";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main className="min-h-full">
        <Outlet />
      </main>
    </QueryClientProvider>
  );
}
