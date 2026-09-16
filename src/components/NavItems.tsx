import { NavLink } from "react-router";
import { cn } from "../lib/utils";

export default function NavItems() {
  const navItems = [
    { name: "Wallpapers", href: "/wallpapers" },
    { name: "Favoritos", href: "/favoritos" },
    { name: "Upload", href: "/upload" },
  ];

  return (
    <>
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.href}
          className={({ isActive }) => cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all",
            isActive
              ? "bg-zinc-800 text-white"
              : "text-zinc-400 hover:text-white hover:bg-zinc-900"
          )}
        >
          {item.name}
        </NavLink>
      ))}
    </>
  );
}