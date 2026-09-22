import { LogOut  } from "lucide-react";
import { useLogout } from "../api/queries";
import { useEffect, useMemo, useRef, useState } from "react";

interface UserDropdownProps {
  username: string;
}

function getInitials(username: string): string {
  const parts = username.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export function UserDropdown({ username }: UserDropdownProps) {
  const logout = useLogout();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const initial = useMemo(() => getInitials(username), [username]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={ref} className="relative cursor-pointer">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex gap-2 items-center transition-colors cursor-pointer"
      >
        <div className="w-7 h-7 rounded-full bg-linear-to-br from-primary to-[#3AEDE3] flex items-center justify-center mr-1">
          <span className="text-background text-sm font-semibold">
            {initial}
          </span>
        </div>
        <span className="text-white text-sm max-w-25 truncate font-semibold">
          {username}
        </span>
      </button>

      <div
        className={`absolute right-0 mt-2 w-48 origin-top-right rounded-md border border-zinc-800 bg-zinc-900 p-1 shadow-md transition-all duration-150 ease-out ${
          open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
        }`}
      >
        <button
          onClick={() => logout.mutate()}
          className="w-full flex items-center gap-2 text-red-400 hover:bg-zinc-800 cursor-pointer select-none rounded-sm px-2 py-1.5 text-sm outline-none transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    </div>
  );
}
