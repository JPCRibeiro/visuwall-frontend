import { Outlet } from "react-router";
import Header from "./components/Header";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <div>
      <Header />
      <main className="mt-16">
        <Outlet />
      </main>
    </div>
    </QueryClientProvider>
  );
}
